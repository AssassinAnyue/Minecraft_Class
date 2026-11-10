# Minecraft 小學堂

給小朋友上 Minecraft 課用的靜態網站，可以直接用 GitHub Pages 發佈。

## 檔案結構

```
index.html                       首頁（含下載按鈕）
style.css                        樣式
downloads/MinecraftInstaller.msi 安裝程式
```

## 發佈到 GitHub Pages

1. 在 GitHub 建立一個新的 repository，把這個資料夾的檔案推上去
2. 到 repository 的 **Settings → Pages**
3. Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`，按 Save
4. 等一兩分鐘，網址會是 `https://<你的帳號>.github.io/<repository 名稱>/`

> GitHub 單一檔案上限 100 MB，安裝程式約 2.2 MB，沒問題。
