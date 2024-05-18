/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { getAdapter } from "../misc/adapter";
import StarryButton from "./StarryButton";

const WalletConnectButton=({setAddressCallback}) => {
  const [address, setAddress] = React.useState();
  useEffect(() => {
    const init = async () => {
      const adapter = await getAdapter();
      // Eager connect
      if (await adapter.canEagerConnect()) {
        try {
          await adapter.connect();
          const publicKey = await adapter.accounts.get();
          if (publicKey.length > 0) {
            setAddress(publicKey[0].address);
          }
        } catch (error) {
          await adapter.disconnect().catch(() => {});
          console.log(error);
        }
      }
    };
    init();
    // Try eagerly connect
  }, []);
  return (
        <div className="flex flex-col space-y-4">
          <StarryButton
            connected={address !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter();
              try {
                await adapter.connect();
                const publicKey = await adapter.accounts.get();
                if (publicKey.length > 0) {
                  setAddress(publicKey[0].address);
                  setAddressCallback(publicKey[0].address);
                  console.log(publicKey[0].address);
                }
              } catch (error) {
                await adapter.disconnect().catch(() => {});
                console.log(error);
              }
            }}
            onDisconnect={async () => {
              try {
                const adapter = await getAdapter();
                await adapter.disconnect();
                setAddress(undefined);
                setAddressCallback(undefined);
              } catch (error) {
                console.log(error);
              }
            }}
            publicKey={address}
          />
        </div>
  );
};

export default WalletConnectButton;