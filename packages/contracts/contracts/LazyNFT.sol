//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract LazyNFT is BaseRelayRecipient, ERC721, EIP712 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string private constant SIGNING_DOMAIN = "LazyMintNFT";
    string private constant SIGNATURE_VERSION = "1";

    struct NFTVoucher {
        uint256 minPrice;
        string name;
        bytes signature;
    }
    mapping(address => mapping(string => NFTVoucher)) public NFTVouchers;

    mapping(uint256 => NFTVoucher) public NFTs;

    constructor(address _trustedForwarder)
        ERC721(SIGNING_DOMAIN, "MyNFT")
        EIP712(SIGNING_DOMAIN, SIGNATURE_VERSION)
    {
        _setTrustedForwarder(_trustedForwarder);
    }

    string public override versionRecipient = "2.2.0";

    function _msgSender()
        internal
        view
        override(Context, BaseRelayRecipient)
        returns (address sender)
    {
        sender = BaseRelayRecipient._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, BaseRelayRecipient)
        returns (bytes calldata)
    {
        return BaseRelayRecipient._msgData();
    }

    function createVoucher(NFTVoucher calldata voucher) public {
        require(isTrustedForwarder(_msgSender()), "Unauthorized");
        address signer = _verify(voucher);
        NFTVouchers[signer][voucher.name] = voucher;
    }

    function redeem(address redeemer, NFTVoucher calldata voucher)
        public
        payable
        returns (uint256)
    {
        require(msg.value >= voucher.minPrice, "Insufficient funds to redeem");
        address signer = _verify(voucher);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(signer, newItemId);
        _transfer(signer, redeemer, newItemId);
        NFTs[newItemId] = voucher;
        return newItemId;
    }

    function _hash(NFTVoucher calldata voucher)
        internal
        view
        returns (bytes32)
    {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256("NFTVoucher(uint256 minPrice,string name)"),
                        voucher.minPrice,
                        keccak256(bytes(voucher.name))
                    )
                )
            );
    }

    function _verify(NFTVoucher calldata voucher)
        internal
        view
        returns (address)
    {
        bytes32 digest = _hash(voucher);
        return ECDSA.recover(digest, voucher.signature);
    }
}
