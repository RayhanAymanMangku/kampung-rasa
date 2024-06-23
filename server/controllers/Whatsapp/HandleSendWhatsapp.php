<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $nama = $data['namaCustomer'];
    $jmlOrang = $data['jumlahOrang'];
    $jenisEvent = $data['jenisEvent'];
    $tanggal = $data['tanggal'];

    $noWa = '+6281392081108'; // nomor tujuan tetap

    $message = "Nama: $nama\nJumlah Orang: $jmlOrang\nJenis Event: $jenisEvent\nTanggal: $tanggal\nHalo, Apakah bisa saya mendapatkan informasi lebih lanjut mengenai reservasi event saya?";
    $encoded_message = urlencode($message);
    $whatsapp_url = "https://api.whatsapp.com/send?phone=$noWa&text=$encoded_message";

    header('Content-Type: application/json');
    echo json_encode(['whatsapp_url' => $whatsapp_url]);
} else {
    http_response_code(405);
    echo "Method not allowed";
}
?>