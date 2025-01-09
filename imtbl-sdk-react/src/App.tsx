import { useEffect } from 'react';
import { checkout, config } from '@imtbl/sdk';

// Create an instance of the Checkout SDK and configure the environment SANDBOX / PRODUCTION
const checkoutSDK = new checkout.Checkout({
  baseConfig: { environment: config.Environment.SANDBOX },
  bridge: { enable: true },
  swap: { enable: true },
  onRamp: { enable: true }
});

export default function App () {
  useEffect(() => {
    (async () => {
      // Get an instance of the factory to be able to create the Widget
      const factory = await checkoutSDK.widgets({
        config: { theme: checkout.WidgetTheme.DARK },
      });

      // RECOMMENDED: Create the Commerce Widget once at the start of your application.
      const widget = factory.create(checkout.WidgetType.IMMUTABLE_COMMERCE, {
        // provider: web3Provider // pass in a Web3Provider if already connected to a wallet
        config: {
          // pass in the configuration for each flow
          WALLET: {
            showNetworkMenu: true,
            showDisconnectButton: true,
          }
        }
      });

      // Mount the Commerce Widget at the element id provided
      // You can mount and unmount this widget in specific parts of your application as needed.
      widget.mount('mount-point', {
        // the flow to be used
        flow: checkout.CommerceFlowType.WALLET,
        // ... other params, will depend on the selected flow
      });
    })();
  }, []);

  return ( <div>
      <h1 className="sample-heading">Immutable Wallet Widget</h1><div id="mount-point" /></div>);
};