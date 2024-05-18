import { NightlyConnectAdapter } from "@nightlylabs/wallet-selector-polkadot";

let _adapter
export const getAdapter = async (
  persisted = true,
  connectionOptions = {}
) => {
  if (_adapter) return _adapter;
  _adapter = await NightlyConnectAdapter.build(
    {
      appMetadata: {
        name: "zkAuction",
        description: "zkAuction",
        icon: "https://docs.nightly.app/img/logo.png",
      },
      network: "AlephZero",
      persistent: persisted,
    },
    connectionOptions
  );
  return _adapter;
};