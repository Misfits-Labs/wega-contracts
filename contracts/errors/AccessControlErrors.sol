// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

abstract contract AccessControlErrors {
 string constant EMPT_RECEIVER = "WegaAccessControl: ReceiverIsEmpty";
 string constant CALLER_NOT_ALLOWED = "WegaAccessControl: CallerNotAllowed";
}