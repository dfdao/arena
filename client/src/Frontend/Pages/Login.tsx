import { EthConnection, ThrottledConcurrentQueue, weiToEth } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import { Wallet, utils } from 'ethers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Account, addAccount, getAccounts, setActive } from '../../Backend/Network/AccountManager';
import { isProdNetwork } from '../../Backend/Network/Blockchain';
import { sendDrip } from '../../Backend/Network/UtilityServerAPI';
import { InitRenderState, TerminalWrapper, Wrapper } from '../Components/GameLandingPageComponents';
import { MythicLabelText } from '../Components/Labels/MythicLabel';
import { TextPreview } from '../Components/TextPreview';
import { Incompatibility, unsupportedFeatures } from '../Utils/BrowserChecks';
import { TerminalTextStyle } from '../Utils/TerminalTypes';
import { Terminal, TerminalHandle } from '../Views/Terminal';
import { useHistory } from 'react-router-dom';
import { LoadingStatus, useEthConnection } from '@Utils/AppHooks';
import LoadingPage from './LoadingPage';

export class EntryPageTerminal {
  private ethConnection: EthConnection;
  private terminal: TerminalHandle;
  private accountSet: (account: Account, tutorial: boolean) => void;
  private balancesEth: { [address: EthAddress]: number };

  public constructor(
    ethConnection: EthConnection,
    terminal: TerminalHandle,
    accountSet: (account: Account, tutorial: boolean) => void
  ) {
    this.ethConnection = ethConnection;
    this.terminal = terminal;
    this.accountSet = accountSet;
    this.balancesEth = {};
  }

  private async loadBalances(addresses: EthAddress[]) {
    const queue = new ThrottledConcurrentQueue({
      invocationIntervalMs: 1000,
      maxInvocationsPerIntervalMs: 25,
    });

    const balances = await Promise.all(
      addresses.map((address) => queue.add(() => this.ethConnection.loadBalance(address)))
    );

    addresses.map((a, i) => {
      this.balancesEth[a] = weiToEth(balances[i]);
    });
  }

  public async checkCompatibility() {
    this.terminal?.printElement(<MythicLabelText text='Welcome to Dark Forest Arena' />);
    this.terminal?.newline();
    this.terminal?.newline();

    const issues = await unsupportedFeatures();

    if (issues.includes(Incompatibility.MobileOrTablet)) {
      this.terminal.println(
        'ERROR: Mobile or tablet device detected. Please use desktop.',
        TerminalTextStyle.Red
      );
    }

    if (issues.includes(Incompatibility.NoIDB)) {
      this.terminal.println(
        'ERROR: IndexedDB not found. Try using a different browser.',
        TerminalTextStyle.Red
      );
    }

    if (issues.includes(Incompatibility.UnsupportedBrowser)) {
      this.terminal.println(
        'ERROR: Browser unsupported. Try Brave, Firefox, or Chrome.',
        TerminalTextStyle.Red
      );
    }

    if (issues.length > 0) {
      this.terminal.print(`${issues.length.toString()} errors found. `, TerminalTextStyle.Red);
      this.terminal.println('Please resolve them and refresh the page.');
      return;
    } else {
      this.terminal?.println(`Login or create an account.`);
      this.terminal?.println(`To choose an option, type its symbol and press ENTER.`);
      await this.chooseAccount();
    }
  }
  public async chooseAccount() {
    const accounts = getAccounts();

    this.terminal?.newline();
    this.terminal?.println(`Found ${accounts.length} accounts on this device. `);
    this.terminal?.newline();

    try {
      await this.loadBalances(accounts.map((a) => a.address));
    } catch (e) {
      console.log(e);
      this.terminal?.println(
        `Error loading balances. Reload the page to try again.`,
        TerminalTextStyle.Red
      );
      return;
    }

    accounts.forEach((account, i) => {
      this.terminal?.print(`(${i + 1}): `, TerminalTextStyle.Sub);
      this.terminal?.print(`${account.address} `);
      this.terminal?.println(
        this.balancesEth[account.address].toFixed(4) + ' xDAI',
        this.balancesEth[account.address] < 0.1 ? TerminalTextStyle.Red : TerminalTextStyle.Green
      );
    });

    this.terminal?.print('(n) ', TerminalTextStyle.Sub);
    this.terminal?.println(`Create new account.`);
    this.terminal?.print('(i) ', TerminalTextStyle.Sub);
    this.terminal?.println(`Import account using private key.`);
    this.terminal?.println(``);
    this.terminal?.println(`Select an option:`, TerminalTextStyle.Text);

    const userInput = await this.terminal?.getInput();

    if (+userInput && +userInput <= accounts.length && +userInput > 0) {
      const selectedAccount = accounts[+userInput - 1];
      this.drip(selectedAccount, false, true);
    } else if (userInput === 'n') {
      this.generateAccount();
    } else if (userInput === 'i') {
      this.importAccount();
    } else if (userInput === undefined) {
      return;
    } else {
      this.terminal?.println('Unrecognized input. Please try again.', TerminalTextStyle.Red);
      this.terminal?.println('');
      await this.chooseAccount();
    }
  }

  private async generateAccount() {
    const newWallet = Wallet.createRandom();
    const account: Account = {
      privateKey: newWallet.privateKey,
      address: address(newWallet.address),
    };

    try {
      this.terminal.println(``);
      this.terminal.print(`Creating new account with address `);
      this.terminal.printElement(<TextPreview text={account.address} unFocusedWidth={'100px'} />);
      this.terminal.println(``);
      this.terminal.println('');
      this.terminal.print('Note: This account is a ', TerminalTextStyle.Sub);
      this.terminal.println('burner wallet.', TerminalTextStyle.Red);
      this.terminal.println('It should never store substantial funds!', TerminalTextStyle.Sub);
      this.terminal.newline();
      this.drip(account);
    } catch (e) {
      console.log(e);
      this.terminal.println('An unknown error occurred. please try again.', TerminalTextStyle.Red);
    }
  }

  private async importAccount() {
    this.terminal.println(
      'Enter the 0x-prefixed private key of the account you wish to import.',
      TerminalTextStyle.Text
    );
    this.terminal.newline();
    this.terminal.print('Note: This account is a ', TerminalTextStyle.Sub);
    this.terminal.println('burner wallet.', TerminalTextStyle.Red);
    this.terminal.println('It should never store substantial funds!', TerminalTextStyle.Sub);

    this.terminal.newline();
    this.terminal.println('(x) to cancel', TerminalTextStyle.Text);
    this.terminal.newline();
    const newSKey = await this.terminal.getInput();
    if (newSKey === 'x') {
      this.terminal.newline();
      this.terminal.println('Cancelled import.', TerminalTextStyle.Text);
      await this.chooseAccount();
      return;
    }
    try {
      const newAddr = address(utils.computeAddress(newSKey));

      this.terminal.println(`Successfully created account with address ${newAddr.toString()}`);
      this.terminal.newline();

      this.drip({ address: newAddr, privateKey: newSKey });
    } catch (e) {
      this.terminal.println('An unknown error occurred. please try again.', TerminalTextStyle.Red);
      this.terminal.println('');
      this.importAccount();
    }
  }

  private async setAccount(account: Account, tutorial: boolean) {
    try {
      if (this.balancesEth[account.address] < 0.1) {
        this.terminal?.println(
          `Your balance is low. You can get more XDAI here:`,
          TerminalTextStyle.Red
        );
        this.terminal?.printLink(
          `dfdao discord`,
          () => window.open(`https://discord.gg/aaHada53mQ`),
          TerminalTextStyle.Blue
        );
        this.terminal?.newline();
        this.terminal?.printLink(
          `Gnosis`,
          () => window.open(`https://buyxdai.com`),
          TerminalTextStyle.Blue
        );
        this.terminal?.newline();
        this.terminal?.println(
          `Press ENTER to continue with this account.`,
          TerminalTextStyle.White
        );
        const input = await this.terminal?.getInput();
      }
      await this.ethConnection.setAccount(account.privateKey);
      setActive(account);
      this.accountSet(account, tutorial);
    } catch (e) {
      console.log(e);
      await new Promise((r) => setTimeout(r, 1500));
      await this.chooseAccount();
    }
  }

  private async playTutorial(account: Account) {
    try {
      if (!getAccounts().find((acc) => acc.address == account.address))
        addAccount(account.privateKey);

      this.terminal.println('This is a new account. Would you like to play the tutorial?');
      this.terminal?.print('(y) ', TerminalTextStyle.Sub);
      this.terminal?.println(`Yes. Take me to the tutorial.`);
      this.terminal?.print('(n) ', TerminalTextStyle.Sub);
      this.terminal?.println(`No. Take me to the game.`);
      const userInput = await this.terminal?.getInput();
      if (userInput === 'y') {
        this.setAccount(account, true);
      } else if (userInput === 'n') {
        this.setAccount(account, false);
      } else {
        this.terminal?.println('Unrecognized input. Please try again.', TerminalTextStyle.Red);
        this.terminal?.println('');
        await this.playTutorial(account);
      }
    } catch (e) {}
  }

  private async drip(
    account: Account,
    tutorialStep: boolean = true,
    existingAccount: boolean = false
  ) {
    try {
      console.log(`Maybe dripping...`, account.address);

      const success = await sendDrip(this.ethConnection, account.address, this.terminal);
      console.log(
        `Is Prod network?`,
        isProdNetwork,
        `Success`,
        success,
        `Existing account`,
        existingAccount
      );

      if (success && !isProdNetwork) {
        await this.setAccount(account, false);
        return;
      } else if (success && existingAccount) {
        // Ask user to hit enter to continue
        this.terminal?.newline();
        this.terminal.println(`Press ENTER to continue`, TerminalTextStyle.Mythic);
        const userInput = await this.terminal?.getInput();
        if (userInput) {
          await this.setAccount(account, false);
          return;
        }
      }

      if (tutorialStep) await this.playTutorial(account);
      else await this.setAccount(account, false);
    } catch (e) {
      console.log(e);
      this.terminal?.newline();
      this.terminal.println(
        `Press y to continue with this account OR press n to choose again`,
        TerminalTextStyle.Blue
      );
      const userInput = await this.terminal?.getInput();
      console.log(`[ERROR INPUT]`, userInput, userInput.length);
      if (userInput === 'y') {
        await this.setAccount(account, false);
      } else if (userInput === 'n') {
        await this.chooseAccount();
      } else {
        this.terminal?.newline();
        this.terminal?.println('Unrecognized input. Please try again.', TerminalTextStyle.Red);
        this.terminal?.println('');
        await this.chooseAccount();
      }
    }
  }
}

export function Login() {
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  const returnUrl = params.get('returnUrl');
  console.log(`[LOGIN] init returnUrl`, returnUrl);
  if (!returnUrl) return <h1>ERROR: Missing return url</h1>;

  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');
  const [controller] = useState<EntryPageTerminal | undefined>();
  const connection = useEthConnection();

  const controllerHandler = useCallback(
    (terminalRef) => {
      if (!controller && connection) {
        const newController = new EntryPageTerminal(
          connection,
          terminalRef,
          async (account: Account, tutorial: boolean) => {
            if (tutorial) {
              history.push(`/play/tutorial`);
            }
            await connection.setAccount(account.privateKey);

            setLoadingStatus('complete');
          }
        );
        newController.checkCompatibility();
      }
    },
    [connection, controller]
  );

  useEffect(() => {
    if (loadingStatus === 'complete') {
      console.log(`[LOGIN] returning to `, returnUrl);
      history.push(returnUrl);
    }
  }, [loadingStatus]);

  if (!connection) {
    return <LoadingPage />;
  } else if (loadingStatus == 'loading') {
    return (
      <Wrapper initRender={InitRenderState.NONE} terminalEnabled={false}>
        <TerminalWrapper initRender={InitRenderState.NONE} terminalEnabled={false}>
          <Terminal ref={controllerHandler} promptCharacter={'$'} />
        </TerminalWrapper>

        {/* this div is here so the styling matches gamelandingpage styling*/}
        <div></div>
      </Wrapper>
    );
  } else {
    return <h1>Stuck</h1>;
  }
}
