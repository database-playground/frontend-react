# Database Playground 的前端

## 環境變數設定

```env
# Database Playground 後端的 base URL
VITE_BACKEND_URI=https://localhost:8081
```

## 開發

```shell
pnpm install

# 啟動 dev server
pnpm dev

# 啟動 GraphQL codegen
pnpm codegen:watch

# 啟動 Local SSL Proxy (for Secure cookies)
pnpm dlx local-ssl-proxy --source 8081 --target 5173
```

### Linting & Formatting

```shell
# Lint with fix
pnpm lint:fix

# Format
pnpm format
```

### 針對正式環境的後端伺服器進行開發

如果你需要直接針對 `https://api.dbplay.app` 執行請求（有嚴格的 CORS 設定，同時其憑證使用 `__Host` 開頭的 cookie 儲存），則需要另外簽發有效的 TLS certificate。

首先 `api.dbplay.app` 有放行 `dev.dbplay.app` 作為公用開發網域，因此您需要將 `dev.dbplay.app` 指向 `127.0.0.1`：

```shell
echo "127.0.0.1 dev.dbplay.app" >> /etc/hosts
```

接著，簽發有效的 TLS certificate：

```shell
nix run nixpkgs#mkcert -- -install
nix run nixpkgs#mkcert -- dev.dbplay.app
```

最後，在 Local SSL Proxy 中帶入你簽發的 TLS certificate：

```shell
pnpm dlx local-ssl-proxy --source 8082 --target 5173 -k dev.dbplay.app-key.pem -c dev.dbplay.app.pem
```

最後前往 `https://dev.dbplay.app:8082` 進行開發。
