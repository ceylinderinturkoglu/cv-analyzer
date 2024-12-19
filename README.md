# CV Analyzer
## Next.js Projesi için GITHUB_TOKEN Ayarı

Bu proje, `next.config.js` dosyasında çevresel değişkenler (environment variables) kullanmaktadır. Aşağıda, GitHub'dan bir API anahtarı (GITHUB_TOKEN) alarak bu değişkeni nasıl tanımlayacağınızı adım adım açıklıyoruz.

---

## 1. GitHub'dan API Anahtarı Almak

1. GitHub hesabınıza giriş yapın.
2. Sağ üst köşedeki profil resminize tıklayın ve **Settings**'i seçin.
3. Sol taraftaki menüden **Developer settings** seçeneğine tıklayın.
4. **Personal access tokens** > **Tokens (classic)** yolunu izleyin.
5. **Generate new token** butonuna tıklayın.
6. Aşağıdaki bilgileri doldurun:
   - **Note**: Token için bir açıklama girin (örneğin, "Next.js Projesi").
   - **Expiration**: Token süresini seçin (örneğin, 30 gün veya "No expiration").
   - **Scopes**: Gerekli izinleri seçin (örneğin, `repo`, `read:org`, vb.).
7. **Generate token** butonuna tıklayın.
8. Oluşturulan token'ı kopyalayın ve güvenli bir yere kaydedin.

---

## 2. `next.config.js` Dosyasını Düzenlemek

1. Projenizin kök dizininde bulunan `next.config.js` dosyasını açın.
2. Aşağıdaki gibi, `GITHUB_TOKEN` değerini oluşturduğunuz API anahtarı ile değiştirin:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     env: {
       GITHUB_TOKEN: "BURAYA_API_KEY_YAZIN",
     },
     experimental: {
       turbo: {
         // ...
       },
     },
   };

   module.exports = nextConfig;
