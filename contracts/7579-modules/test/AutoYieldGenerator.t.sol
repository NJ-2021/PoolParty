// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test} from "forge-std/Test.sol";
import {RhinestoneModuleKit, ModuleKitHelpers, ModuleKitUserOp, AccountInstance} from "modulekit/ModuleKit.sol";
import {MODULE_TYPE_EXECUTOR} from "modulekit/external/ERC7579.sol";
import {ExecutionLib} from "erc7579/lib/ExecutionLib.sol";
import {AutoYieldGenerator} from "src/AutoYieldGenerator.sol";

contract AutoYieldGeneratorTest is RhinestoneModuleKit, Test {
    using ModuleKitHelpers for *;
    using ModuleKitUserOp for *;

    // account and modules
    AccountInstance internal instance;
    AutoYieldGenerator internal executor;

    function setUp() public {
        init();

        // Create the executor
        executor = new AutoYieldGenerator();
        vm.label(address(executor), "AutoYieldGenerator");

        // Create the account and install the executor
        instance = makeAccountInstance("AutoYieldGenerator");
        vm.deal(address(instance.account), 1 ether);
    }

    function test_OnInstall() public {
        assertEq(executor.isInitialized(address(instance.account)), false);
    }

    function test_IsInitialized() public {
        instance.installModule({
            moduleTypeId: MODULE_TYPE_EXECUTOR,
            module: address(executor),
            data: ""
        });

        assertEq(executor.isInitialized(address(instance.account)), true);
    }

    function test_OnUninstall() public {
        executor.onInstall("");
        executor.onUninstall("");

        assertEq(executor.isInitialized(address(instance.account)), false);
    }

    function test_Name() public {
        assertEq(executor.name(), "AutoYieldGenerator");
    }

    function test_Version() public {
        assertEq(executor.name(), "0.0.1");
    }
}
