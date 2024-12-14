**📢 Massive Bioinformatics Assessment**

https://nagmeu.github.io/MassiveBioinformatics_Assessment/

-TR-

Bu projede, React kullanarak bir front end geliştirdim. Rick&Morty API'dan çektiğimiz verileri 4 kolondan oluşmakta olan tabloda karakterlerin fotoğrafları ve isimleri ile gösterdim. 
Tabloda kaç karakterin görüntüleneceği sayfada verilmiş olan dropdown menüsünden seçilebilir. Bu seçimi text box yerine dropdown menüsü ile yapmamın sebebi ekranda daha düzenli bir görüntü olmasını
istiyor oluşumdu.

Aynı zamanda karakterlerin isimleri A'dan Z'ye ya da Z'den A'ya olacak şekilde sıralanabilir. 

Ekranın solunda bulunan filters etiketine bastıktan sonra yanda açılacak menü ile karakterler isimlerine, cinsiyetlerine, hayatta olup olmama durumlarına ve türlerine göre filtreleme yapılabilir. 
Filtrelemek için dropdown menüsü manuel değil, api'dan gelen bilgilere göre şekillenmektedir. Bu ekranda da daha düzenli ve modern bir görünüm için radio button yerine dropdown menü kullanmayı tercih ettim.

Filtreleme yapıldıktan sonra filtrelemelerin sonucundaki karakterler ekranın sağ tarafında filtreleme yapıldığı anda güncellenmektedir. Eğer belirtilen filtrelemelerin karşılığına denk gelen
bir karakter yok ise, çıkacak pop-up ile belirtilen filtrelere karşılık gelen karakterin bulunamadığına dair uyarı vermektedir. 

Karakter tablosunun en altında bulunan kısım ile ileri, geri, ilk sayfa, son sayfa ve istenilen sayfaya ulaşım sağlanmaktadır. Bu kısım filtreleme sonuçlarındaki karakter sayısına bağlı olarak
kendini güncellemektedir. 

Karakterlerin gösterildiği kutucuklara basıldığında ise karakterlerin detaylı bilgisi için karşımıza çıkan modal window ile farklı bir sekmeye yönlendirilmeden karakterlerin detaylı bilgilerinin 
gözlemlenmesi amaçlanmıştır. Bu modal windowda karakterlerin isimleri, resimleri, hayatta olup olmadıklarına dair durumları, türleri, cinsiyetleri, lokasyonları ve ilk/son görüldükleri bölümler
gözlemlenebilmektedir. 

-EN-

In this project, I developed a front-end interface using React. We fetched data from the Rick and Morty API and displayed it in a four-column table containing the characters' photos and names. The number of characters displayed in the table can be selected from a dropdown menu on the page. I opted for a dropdown menu instead of a text box to maintain a cleaner and more organized visual layout.

Additionally, the characters can be sorted alphabetically by name in ascending or descending order.

On the left side of the screen, clicking on the Filters tag opens a side menu. This menu allows users to filter characters based on their names, gender, alive/dead status, and species. To maintain a more organized and modern appearance, I chose a dropdown menu over radio buttons for filtering.

After applying filters, the characters matching the specified criteria are dynamically updated on the right side of the screen. If no characters match the given filters, a pop-up message appears, notifying the user that no characters correspond to the selected filters.

At the bottom of the character table, there is a pagination section that enables navigation to the next, previous, first, last, or a specific page. This section automatically updates according to the number of characters resulting from the filtering process.

When a user clicks on the character boxes, a modal window pops up instead of redirecting to a new tab. This allows users to view detailed character information directly within the modal window. In this window, users can observe the characters' names, images, alive/dead status, species, gender, locations, and the sections where they were first/last seen.
