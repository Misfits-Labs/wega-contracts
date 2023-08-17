# Wega NFT Escrow service

This project demonstrates how the escrow service, which will contain the foundational mechanisms required in wega nft betting.
note this is just testing so use the contracts at your own risk.

```shell
$ cp .env.example .env # don't forget to add rpc urls and coinbase addresses and protocol addresses in .env
$ yarn -i 
```

## Get set up for UI development
```shell
$ yarn start:node
$ yarn deploy:localhost
$ export UI_PATH=<path-to-the-ui_.external-folder> && yarn run export:demo-ui 
```
example for UI_PATH -> UI_PATH=../demo-ui-escrow-service/.external
