-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 18, 2024 at 04:58 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kampung_rasa_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `idCustomer` int(255) NOT NULL,
  `namaCustomer` text NOT NULL,
  `kontakCustomer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`idCustomer`, `namaCustomer`, `kontakCustomer`) VALUES
(464, 'Ayman', '+6281245857339'),
(465, 'Ayman', '+6281245857339'),
(466, 'Zidan', '+6281245857339');

-- --------------------------------------------------------

--
-- Table structure for table `detailPesanan`
--

CREATE TABLE `detailPesanan` (
  `idDetailPesanan` int(255) NOT NULL,
  `idPesanan` int(255) DEFAULT NULL,
  `idMenu` int(255) DEFAULT NULL,
  `quantity` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detailPesanan`
--

INSERT INTO `detailPesanan` (`idDetailPesanan`, `idPesanan`, `idMenu`, `quantity`) VALUES
(131, 68, 2, 1),
(132, 68, 9, 1),
(133, 69, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `kategorimenu`
--

CREATE TABLE `kategorimenu` (
  `idKategoriMenu` int(11) NOT NULL,
  `kategoriMenu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategorimenu`
--

INSERT INTO `kategorimenu` (`idKategoriMenu`, `kategoriMenu`) VALUES
(1, 'Paket Nasi'),
(2, 'Masakan Laut'),
(3, 'Nasi Goreng'),
(4, 'Aneka Sayur'),
(5, 'Aneka Gorengan'),
(6, 'Aneka Minuman'),
(7, 'Tambahan');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `idMenu` int(11) NOT NULL,
  `namaMenu` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `idKategoriMenu` int(11) NOT NULL,
  `idStaf` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`idMenu`, `namaMenu`, `harga`, `gambar`, `idKategoriMenu`, `idStaf`) VALUES
(1, 'Nasi Ayam Goreng', 20000, 'https://babathe.cahayaoleholeh.com/wp-content/uploads/2020/08/gojek-nasi-ayam-goreng-sambal-ijo.jpg', 1, 1),
(2, 'Nasi Ayam Bakar', 22000, 'https://images.tokopedia.net/img/cache/700/VqbcmM/2021/9/24/567e2b4b-8e54-415c-ac15-2476c3f78d8c.jpg', 1, 1),
(3, 'Nasi Bebek Goreng', 20000, 'https://img.kurio.network/C37aKrk5_e8q7LoIMOGq7RorZ5U=/320x320/filters:quality(80)/https://kurio-img.kurioapps.com/21/08/22/8f1c3c61-bfd4-4b0a-8665-f485bd4302a2.jpe', 1, 1),
(4, 'Nasi Bebek Bakar', 25000, 'https://images.tokopedia.net/img/cache/700/product-1/2019/9/29/5814520/5814520_ab927344-2b85-416c-ae01-cbf2275e5af7_1548_1548.jpg', 1, 1),
(5, 'Gurami Goreng', 80000, 'https://cdn.yummy.co.id/content-images/images/20210618/FKxYzftmPTkpaGRZxiAfH8psYAXdh833-31363234303036363939d41d8cd98f00b204e9800998ecf8427e.jpg?x-oss-process=image/resize,w_388,h_388,m_fixed,x-oss-process=image/format,webp', 2, 1),
(6, 'Gurami Bakar', 85000, 'https://kurio-img.kurioapps.com/21/09/01/c96b188f-e5a3-4ac5-b784-36af8b5fb76b.jpe', 2, 1),
(7, 'Gurami Asam Manis', 85000, 'https://down-id.img.susercontent.com/file/e64dbe1a99bf7a94994c0eff6381c8a2', 2, 1),
(8, 'Cumi Goreng Tepung', 30000, 'https://i.pinimg.com/736x/e7/31/51/e73151f7984b540c2356a4f7098f7ab5.jpg', 2, 1),
(9, 'Cumi Bakar', 35000, 'https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/bisnisbandung/2019/01/cumibakarpedas.jpg', 2, 1),
(10, 'Cumi Asam Manis', 35000, 'https://lemonilo.s3.ap-southeast-1.amazonaws.com/article/619909b53974f70001519541.png', 2, 1),
(11, 'Udang Goreng Tepung', 30000, 'https://img.kurio.network/Tlt7KQc2mtYeVNvcRbAkjErE_jQ=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/22/02/08/55609664-b821-4d02-b33c-c04551ce3b24.jpe', 2, 1),
(12, 'Udang Bakar', 35000, 'https://www.dapurkobe.co.id/wp-content/uploads/udang-bakar-bumbu-rujak.jpg', 2, 1),
(13, 'Udang Asam Manis', 35000, 'https://img.kurio.network/-iYA3sYiTNKo1Ix54h-oTO3nGTk=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/19/06/27/c54b99e9-3b79-4bf0-8a42-cb96ee605782.jpg', 2, 1),
(14, 'Nila Goreng', 22000, 'https://resepkoki.id/wp-content/uploads/2022/03/Resep-Ikan-Nila-Goreng.jpg', 2, 1),
(15, 'Nila Bakar', 28000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAyJ-UPMbIU9auwk9h4FD8WZcLZ6JN696VBY4ixlCe6A&s', 2, 1),
(16, 'Nasi Goreng Kampung', 20000, 'https://i0.wp.com/resepkoki.id/wp-content/uploads/2016/09/Resep-Nasi-Goreng-Ikan-Teri.jpg?fit=1920%2C1440&ssl=1', 3, 1),
(17, 'Nasi Goreng Seafood', 28000, 'https://dcostseafood.id/wp-content/uploads/2017/12/Nasi-Goreng-seafood-2.jpg', 3, 1),
(18, 'Sayur Asem', 10000, 'https://www.masakapahariini.com/wp-content/uploads/2023/03/shutterstock_2102970676.jpg', 4, 1),
(19, 'Tumis Kangkung', 15000, 'https://www.finnafood.com/blog/wp-content/uploads/2023/06/22.-Tumis-Kangkung-Sambal-Terasi-Nikmat-Sederhana.jpg', 4, 1),
(20, 'Tumis Tauge', 15000, 'https://i0.wp.com/resepkoki.id/wp-content/uploads/2017/04/Resep-Tumis-tauge.jpg?fit=1920%2C1920&ssl=1', 4, 1),
(21, 'Tempe Penyet', 15000, 'https://cdn.idntimes.com/content-images/post/20210723/rio-njoo87-1627033048770220-a85ed03c56f63382543f8d313bbe8d4b.jpg', 5, 1),
(22, 'Tempe Goreng', 10000, 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2023/11/30/tempe-goreng-1-1-1jpg-20231130015348.jpg', 5, 1),
(23, 'Kentang Goreng', 15000, 'https://www.tokomesin.com/wp-content/uploads/2017/09/3-Cara-Membuat-Kentang-Goreng-Lezat-Tanpa-Ribet-tokomesin2.jpg', 5, 1),
(24, 'Es Jeruk', 8000, 'https://cdn1-production-images-kly.akamaized.net/2bUdwGUydtL50AOEMnCHNkD7FYQ=/469x625/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4777522/original/071308500_1710839241-iced-orange-cocktail-table__2_.jpg', 6, 1),
(25, 'Es Teh Plus Lemon ', 8000, 'https://www.tokomesin.com/wp-content/uploads/2015/09/soda-ice-lemon-tea-tokomesin.jpg', 6, 1),
(26, 'Es Teh Manis', 5000, 'https://nilaigizi.com/assets/images/produk/produk_1578041377.jpg', 6, 1),
(27, 'Jus Alpukat', 15000, 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/3/31/f8ea5a4a-ce68-45cf-a780-5a4b4dffb199.jpg', 6, 1),
(28, 'Jus Jambu', 15000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILfpU_shS9B_2wA4blWmps0DFPtXzLQZobOdiuQ881Q&s', 6, 1),
(29, 'Jus Jeruk', 15000, 'https://www.jagel.id/api/listimage/v/Jus-Jeruk-0-1895ce8e9c3b8b30.jpg', 6, 1),
(30, 'Jus Mangga', 15000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUqQJX5LEt7TwltHBgCbPgzDsQnXJe96Ys33XDNilJw&s', 6, 1),
(31, 'Jus Melon', 15000, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/96/MTA-137614362/no_brand_jus_buah_melon_450_ml-16oz_full00_4DBE37A8-53BA-4B9B-BB78-643FBC60BDD6.jpg', 6, 1),
(32, 'Jus Sirsak', 15000, 'https://asset-a.grid.id/crop/0x0:0x0/x/photo/2018/07/13/3589099835.jpg', 6, 1),
(33, 'Nasi ', 5000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC1aOLFHzLempmRaNbrLoiS_6EHWcDeDOEBY0VOXDLg&s', 7, 1),
(34, 'Air Mineral', 5000, 'https://images.tokopedia.net/img/cache/700/product-1/2020/1/22/5400804/5400804_4866cc12-2042-4f06-8f84-0497dd4cd6d6_1076_1076.jpg', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `idOrder` int(255) NOT NULL,
  `idCustomer` int(255) DEFAULT NULL,
  `idTable` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`idOrder`, `idCustomer`, `idTable`) VALUES
(42, 465, 4),
(43, 466, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `idPesanan` int(11) NOT NULL,
  `idCustomer` int(11) NOT NULL,
  `waktuPesanan` time NOT NULL,
  `totalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`idPesanan`, `idCustomer`, `waktuPesanan`, `totalPrice`) VALUES
(68, 465, '16:34:43', 57000),
(69, 466, '16:52:02', 44000);

-- --------------------------------------------------------

--
-- Table structure for table `reservasi`
--

CREATE TABLE `reservasi` (
  `idReservasi` int(255) NOT NULL,
  `namaCustomer` text NOT NULL,
  `jumlahOrang` int(255) NOT NULL,
  `tempat` text NOT NULL,
  `jenisReservasi` text NOT NULL,
  `tanggalReservasi` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservasi`
--

INSERT INTO `reservasi` (`idReservasi`, `namaCustomer`, `jumlahOrang`, `tempat`, `jenisReservasi`, `tanggalReservasi`) VALUES
(12, 'Jundan', 8, 'Aula Bromo', 'Rapat', '2024-06-10');

-- --------------------------------------------------------

--
-- Table structure for table `staf`
--

CREATE TABLE `staf` (
  `id_staf` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `kontakStaf` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staf`
--

INSERT INTO `staf` (`id_staf`, `username`, `kontakStaf`, `password`) VALUES
(1, 'Ayman', '081245857339', 'admin'),
(2, 'Rian', '081929602372', 'admin'),
(3, 'Zidan', '081392081108‬', 'admin'),
(4, 'Hiro', '‪085640530591‬', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `idTable` int(11) NOT NULL,
  `jenisEvent` varchar(255) DEFAULT NULL,
  `namaMeja` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`idTable`, `jenisEvent`, `namaMeja`) VALUES
(1, 'Semeru', 'Table 1'),
(2, 'Semeru', 'Table 2'),
(3, 'Semeru', 'Table 3'),
(4, 'Merbabu', 'Table 1'),
(5, 'Merbabu', 'Table 2');

-- --------------------------------------------------------

--
-- Table structure for table `takeaway_orders`
--

CREATE TABLE `takeaway_orders` (
  `idOrder` int(255) NOT NULL,
  `idCustomer` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`idCustomer`);

--
-- Indexes for table `detailPesanan`
--
ALTER TABLE `detailPesanan`
  ADD PRIMARY KEY (`idDetailPesanan`),
  ADD KEY `idMenu` (`idMenu`);

--
-- Indexes for table `kategorimenu`
--
ALTER TABLE `kategorimenu`
  ADD PRIMARY KEY (`idKategoriMenu`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`idMenu`),
  ADD KEY `menu_staf` (`idStaf`),
  ADD KEY `menu_kategori` (`idKategoriMenu`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `idCustomer` (`idCustomer`),
  ADD KEY `idTable` (`idTable`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`idPesanan`),
  ADD KEY `idCustomer` (`idCustomer`);

--
-- Indexes for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`idReservasi`);

--
-- Indexes for table `staf`
--
ALTER TABLE `staf`
  ADD PRIMARY KEY (`id_staf`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`idTable`);

--
-- Indexes for table `takeaway_orders`
--
ALTER TABLE `takeaway_orders`
  ADD PRIMARY KEY (`idOrder`),
  ADD KEY `idCustomer` (`idCustomer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `idCustomer` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467;

--
-- AUTO_INCREMENT for table `detailPesanan`
--
ALTER TABLE `detailPesanan`
  MODIFY `idDetailPesanan` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `idOrder` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `idPesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `idReservasi` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `staf`
--
ALTER TABLE `staf`
  MODIFY `id_staf` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `idTable` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `takeaway_orders`
--
ALTER TABLE `takeaway_orders`
  MODIFY `idOrder` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailPesanan`
--
ALTER TABLE `detailPesanan`
  ADD CONSTRAINT `detailpesanan_ibfk_1` FOREIGN KEY (`idMenu`) REFERENCES `menu` (`idMenu`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`idTable`) REFERENCES `tables` (`idTable`);

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`);

--
-- Constraints for table `takeaway_orders`
--
ALTER TABLE `takeaway_orders`
  ADD CONSTRAINT `takeaway_orders_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `customer` (`idCustomer`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
