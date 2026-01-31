    <?php
    header("Content-Type: application/json");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require __DIR__ . "/PHPMailer-master/src/PHPMailer.php";
    require __DIR__ . "/PHPMailer-master/src/SMTP.php";
    require __DIR__ . "/PHPMailer-master/src/Exception.php";

    $name    = trim($_POST["name"] ?? "");
    $email   = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if ($name === "" || $email === "" || $message === "") {
    echo json_encode(["status"=>"error","message"=>"All fields are required"]);
    exit;
    }

    $mail = new PHPMailer(true);

    try {
    // SMTP SETTINGS
    $mail->isSMTP();
    $mail->Host       = "smtp.gmail.com";
    $mail->SMTPAuth   = true;

    // 🔴 YOUR REAL GMAIL
    $mail->Username   = "santevren0129@gmail.com";
    $mail->Password   = "hcae qxny verh zvym";

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    //  SENDER MUST BE GMAIL
    $mail->setFrom("santevren0129@gmail.com", "ClasMeyt Contact");

    //  YOU RECEIVE THE MESSAGE
    $mail->addAddress("santevren0129@gmail.com");

    //  USER EMAIL (REPLY TARGET)
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "ClasMeyt Contact Message";
    $mail->Body = "
        <b>Name:</b> {$name}<br>
        <b>Email:</b> {$email}<br><br>
        <b>Message:</b><br>
        {$message}
    ";

    $mail->send();

    echo json_encode(["status"=>"success"]);
    exit;

    } catch (Exception $e) {
    echo json_encode([
        "status"=>"error",
        "message"=>$mail->ErrorInfo
    ]);
    exit;
    }
