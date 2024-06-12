import { toNano } from '@ton/core';
import { TonFoodMiniApp } from '../wrappers/TonFoodMiniApp';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonFoodMiniApp = provider.open(await TonFoodMiniApp.fromInit());

    await tonFoodMiniApp.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(tonFoodMiniApp.address);

    console.log('Is contract deployed:', await provider.isContractDeployed(tonFoodMiniApp.address));

    // run methods on `tonFoodMiniApp`
}
