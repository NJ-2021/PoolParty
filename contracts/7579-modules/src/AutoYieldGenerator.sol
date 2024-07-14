// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IRewardsController} from "./Interfaces/IRewardsController.sol";

import {ERC7579ExecutorBase} from "modulekit/Modules.sol";
import {IERC7579Account, Execution} from "modulekit/Accounts.sol";
import {ModeLib} from "erc7579/lib/ModeLib.sol";
import {ExecutionLib} from "erc7579/lib/ExecutionLib.sol";

import {REWARDCONTROLLER_ADDRESS} from "./helper/SepoliaAddresses.sol";

import "forge-std/console.sol";

contract AutoYieldGenerator is ERC7579ExecutorBase {
    /*//////////////////////////////////////////////////////////////////////////
                                    CONSTANTS
    //////////////////////////////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////////////////
                                     CONFIG
    //////////////////////////////////////////////////////////////////////////*/

    /* Initialize the module with the given data
     * @param data The data to initialize the module with
     */
    function onInstall(bytes calldata data) external override {}

    /* De-initialize the module with the given data
     * @param data The data to de-initialize the module with
     */
    function onUninstall(bytes calldata data) external override {
        // _removeModuleData(data);
    }

    /*
     * Check if the module is initialized
     * @param smartAccount The smart account to check
     * @return true if the module is initialized, false otherwise
     */
    function isInitialized(address smartAccount) external view returns (bool) {
        // return _isModuleInitialized(smartAccount);
    }

    /*//////////////////////////////////////////////////////////////////////////
                                     MODULE LOGIC
    //////////////////////////////////////////////////////////////////////////*/

    /*
     * Generate compounding on rewards
     * @param data The data to execute compounding
     */
    function generateYield() external {
        // create an Execution to redeem the max shares
        Execution[] memory redeemExecution = new Execution[](1);
        redeemExecution[0] = Execution({
            target: REWARDCONTROLLER_ADDRESS,
            value: 0,
            callData: abi.encodeCall(IRewardsController.maxRedeem, (msg.sender))
        });

        bytes[] memory returnData = IERC7579Account(msg.sender)
            .executeFromExecutor(
                ModeLib.encodeSimpleBatch(),
                ExecutionLib.encodeBatch(redeemExecution)
            );

        // // decode
        // uint256 maxShares = abi.decode(returnData[0], (uint256));

        // // deposit the redeemed assets back
        // Execution[] memory depositExecution = new Execution[](1);
        // depositExecution[0] = Execution({
        //     target: REWARDCONTROLLER_ADDRESS,
        //     value: 0,
        //     callData: abi.encodeCall(
        //         IRewardsController.deposit,
        //         (maxShares, msg.sender)
        //     )
        // });

        // IERC7579Account(msg.sender).executeFromExecutor(
        //     ModeLib.encodeSimpleBatch(),
        //     ExecutionLib.encodeBatch(depositExecution)
        // );
    }

    /*//////////////////////////////////////////////////////////////////////////
                                     METADATA
    //////////////////////////////////////////////////////////////////////////*/

    /**
     * The name of the module
     * @return name The name of the module
     */
    function name() external pure returns (string memory) {
        return "ModuleExample";
    }

    /**
     * The version of the module
     * @return version The version of the module
     */
    function version() external pure returns (string memory) {
        return "0.0.1";
    }

    /*
     * Check if the module is of a certain type
     * @param typeID The type ID to check
     * @return true if the module is of the given type, false otherwise
     */
    function isModuleType(
        uint256 typeID
    ) external pure override returns (bool) {
        return typeID == TYPE_EXECUTOR;
    }
}
