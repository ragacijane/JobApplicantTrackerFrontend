-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bazakandidata
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `diplome`
--

DROP TABLE IF EXISTS `diplome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diplome` (
  `ID_DIPLOME` int NOT NULL AUTO_INCREMENT,
  `NAZIV_DIPLOME` text NOT NULL,
  PRIMARY KEY (`ID_DIPLOME`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diplome`
--

LOCK TABLES `diplome` WRITE;
/*!40000 ALTER TABLE `diplome` DISABLE KEYS */;
INSERT INTO `diplome` VALUES (1,'Osnovna skola'),(2,'Srednja skola'),(3,'Visa skola'),(4,'Visoka skola'),(5,'Fakultet'),(6,'Master'),(7,'Doktorat');
/*!40000 ALTER TABLE `diplome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kandidat_posao`
--

DROP TABLE IF EXISTS `kandidat_posao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kandidat_posao` (
  `ID_KANDIDATA` int NOT NULL,
  `ID_POSLA` int NOT NULL,
  PRIMARY KEY (`ID_KANDIDATA`,`ID_POSLA`),
  KEY `IDX_e5f386db50c31de5d87c1745c9` (`ID_KANDIDATA`),
  KEY `IDX_b550e84ead4190f38ee4c324ce` (`ID_POSLA`),
  CONSTRAINT `FK_b550e84ead4190f38ee4c324ce7` FOREIGN KEY (`ID_POSLA`) REFERENCES `tip_posla` (`ID_POSLA`),
  CONSTRAINT `FK_e5f386db50c31de5d87c1745c9e` FOREIGN KEY (`ID_KANDIDATA`) REFERENCES `kandidati` (`ID_KANDIDATA`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kandidat_posao`
--

LOCK TABLES `kandidat_posao` WRITE;
/*!40000 ALTER TABLE `kandidat_posao` DISABLE KEYS */;
/*!40000 ALTER TABLE `kandidat_posao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kandidati`
--

DROP TABLE IF EXISTS `kandidati`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kandidati` (
  `ID_KANDIDATA` int NOT NULL AUTO_INCREMENT,
  `ID_DIPLOME` int DEFAULT NULL,
  `ID_KORISNIKA` int DEFAULT NULL,
  `IME_KANDIDATA` text NOT NULL,
  `PREZIME_KANDIDATA` text NOT NULL,
  `JMBG` text NOT NULL,
  `EMAIL` text NOT NULL,
  `TELEFON` text NOT NULL,
  `GRAD` text NOT NULL,
  `ZELJENA_PLATA` text NOT NULL,
  `OBRAZOVNA_USTANOVA` text NOT NULL,
  PRIMARY KEY (`ID_KANDIDATA`),
  UNIQUE KEY `REL_8978c0adf12b90d01c819787c8` (`ID_KORISNIKA`),
  KEY `FK_KANDIDAT_PROFIL_KO_KORISNIC` (`ID_KORISNIKA`),
  KEY `FK_KANDIDAT_DIPLOMA_K_DIPLOME` (`ID_DIPLOME`),
  CONSTRAINT `FK_19efa5272a4e23db223791a37ef` FOREIGN KEY (`ID_DIPLOME`) REFERENCES `diplome` (`ID_DIPLOME`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_8978c0adf12b90d01c819787c89` FOREIGN KEY (`ID_KORISNIKA`) REFERENCES `korisnici` (`ID_KORISNIKA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kandidati`
--

LOCK TABLES `kandidati` WRITE;
/*!40000 ALTER TABLE `kandidati` DISABLE KEYS */;
/*!40000 ALTER TABLE `kandidati` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnici` (
  `ID_KORISNIKA` int NOT NULL AUTO_INCREMENT,
  `ID_TIPA` int DEFAULT NULL,
  `ID_KANDIDATA` int DEFAULT NULL,
  `USERNAME` varchar(45) NOT NULL,
  `PASSWORD` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_KORISNIKA`),
  UNIQUE KEY `REL_b4712bb10a3f0a66d85b54b046` (`ID_KANDIDATA`),
  KEY `FK_KORISNIC_TIP_KORIS_TIP_KORI` (`ID_TIPA`),
  KEY `FK_KORISNIC_PROFIL_KO_KANDIDAT` (`ID_KANDIDATA`),
  CONSTRAINT `FK_58b9018d368827569ab634c57a9` FOREIGN KEY (`ID_TIPA`) REFERENCES `tip_korisnika` (`ID_TIPA`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_b4712bb10a3f0a66d85b54b0469` FOREIGN KEY (`ID_KANDIDATA`) REFERENCES `kandidati` (`ID_KANDIDATA`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnici`
--

LOCK TABLES `korisnici` WRITE;
/*!40000 ALTER TABLE `korisnici` DISABLE KEYS */;
INSERT INTO `korisnici` VALUES (1,2,NULL,'admin','admin');
/*!40000 ALTER TABLE `korisnici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_korisnika`
--

DROP TABLE IF EXISTS `tip_korisnika`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_korisnika` (
  `ID_TIPA` int NOT NULL AUTO_INCREMENT,
  `NAZIV_TIPA` text NOT NULL,
  PRIMARY KEY (`ID_TIPA`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_korisnika`
--

LOCK TABLES `tip_korisnika` WRITE;
/*!40000 ALTER TABLE `tip_korisnika` DISABLE KEYS */;
INSERT INTO `tip_korisnika` VALUES (1,'kandidat'),(2,'admin'),(3,'firma');
/*!40000 ALTER TABLE `tip_korisnika` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tip_posla`
--

DROP TABLE IF EXISTS `tip_posla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tip_posla` (
  `ID_POSLA` int NOT NULL AUTO_INCREMENT,
  `NAZIV_POSLA` text NOT NULL,
  PRIMARY KEY (`ID_POSLA`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tip_posla`
--

LOCK TABLES `tip_posla` WRITE;
/*!40000 ALTER TABLE `tip_posla` DISABLE KEYS */;
INSERT INTO `tip_posla` VALUES (1,'direktor'),(2,'vozac'),(3,'magacioner'),(4,'sekretar'),(5,'cistac');
/*!40000 ALTER TABLE `tip_posla` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31 19:51:12
