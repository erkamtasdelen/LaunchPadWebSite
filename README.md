# LaunchPadWebSite

## Proje Hakkında
LaunchPadWebSite, blockchain tabanlı bir proje olup, merkeziyetsiz uygulamalar (DApp) ve akıllı kontratlarla etkileşim kurmayı amaçlayan bir web sitesi geliştirme projesidir. Bu dokümantasyon, projede bulunan tüm dosyaları detaylı şekilde açıklamaktadır.

## Klasör ve Dosya Yapısı

### 1. Ana Klasör
Proje ana dizini aşağıdaki dosyaları içerir:

- `index.html` - Web sitesinin ana HTML dosyası.
- `style.css` - Genel stil ve düzen tanımlamalarını içeren CSS dosyası.
- `abis.js` - Akıllı kontratların Application Binary Interface (ABI) tanımlarını içeren dosya.
- `blockchain.js` - Blockchain ile etkileşimi sağlayan JavaScript dosyası.


### 2. Klasörler
- **animate/** - Web sitesinde kullanılan animasyonları içeren dosyalar.
- **background/** - Arka plan görsellerini barındıran klasör.
- **photos/** - Projede kullanılan fotoğrafların saklandığı klasör.
- **styles/** - Ek stil dosyalarının bulunduğu dizin.

## Dosya Açıklamaları

### 1. `index.html`
Web sayfasının iskelet yapısını oluşturur. Sayfa içinde HTML5 etiketleri, JavaScript kütüphaneleri ve CSS bağlantıları yer alır. Öne çıkan bileşenler:

- **Başlık ve Meta Etiketleri**: Sayfa başlığını ve karakter kodlamasını tanımlar.
- **Bağlantılar**: `style.css`, `blockchain.js` ve diğer gerekli dosyalar çağrılır.
- **Ana İçerik**: Butonlar, formlar ve blockchain etkileşimi sağlayan bileşenler bulunur.

### 2. `style.css`
Sayfanın görünümünü belirleyen CSS dosyasıdır. Ana bölümleri:

- **Genel Stiller**: Sayfanın genel görünümü için yazı tipi, renkler, arka plan gibi tanımlamalar içerir.
- **Responsive Tasarım**: Mobil uyumluluk sağlamak için medya sorguları kullanılır.
- **Özel Bileşenler**: Butonlar, formlar ve etkileşimli öğelerin stilleri tanımlanır.

### 3. `abis.js`
Akıllı kontratların ABI tanımlarını içerir. Bu dosya, JavaScript'in blockchain ağıyla etkileşim kurmasına olanak tanır.

- **JSON Formatında ABI Verileri**: Ethereum veya Binance Smart Chain üzerinde çalışan akıllı kontratların fonksiyonlarını ve olaylarını tanımlar.
- **Kontrat Adresleri**: Blockchain üzerindeki spesifik akıllı kontrat adresleri belirtilir.

### 4. `blockchain.js`
Blockchain ile etkileşim sağlayan JavaScript dosyasıdır. İçerisinde şu temel işlevler bulunur:

- **Web3.js Entegrasyonu**: Kullanıcı cüzdan bağlantısı (Metamask, Trust Wallet vb.).
- **Akıllı Kontrat Fonksiyonları**: Kullanıcının cüzdanıyla işlem yapmasını sağlayan fonksiyonlar.
- **Event Listenerlar**: Blockchain üzerinde gerçekleşen olayları izleyip, UI güncellemeleri yapar.

### 5. `reguIDO.zip`
İçeriği belirlenmemiş olan bir sıkıştırılmış dosyadır. Muhtemelen proje ile ilgili ek belgeler, test verileri veya başka dosyaları içerebilir.

## Kurulum ve Kullanım

1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/erkamtasdelen/LaunchPadWebSite.git
   ```

2. **Proje Klasörüne Girin:**
   ```bash
   cd LaunchPadWebSite
   ```

3. **Bağımlılıkları Kurun (Eğer Varsa):**
   ```bash
   npm install
   ```

4. **Geliştirme Ortamını Başlatın:**
   ```bash
   npm start
   ```

5. **Web Sayfasını Açın:**
   Tarayıcınızda `index.html` dosyasını açarak projeyi görüntüleyebilirsiniz.

## Katkıda Bulunma
Projeye katkıda bulunmak için aşağıdaki adımları takip edebilirsiniz:

1. Bu depoyu forklayın.
2. Yeni bir dal oluşturun:
   ```bash
   git checkout -b yeni-ozellik
   ```
3. Yaptığınız değişiklikleri ekleyin ve commit yapın:
   ```bash
   git commit -m "Yeni özellik eklendi"
   ```
4. Değişiklikleri uzak sunucuya gönderin:
   ```bash
   git push origin yeni-ozellik
   ```
5. Bir **Pull Request (PR)** oluşturun.

## Lisans


