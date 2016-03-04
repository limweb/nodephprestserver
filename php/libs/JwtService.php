<?php
// require_once __DIR__ . '/../vendor/autoload.php';
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;

trait JwtServicetrait
{

    protected $useJwt = false;
    protected $exptime = 30;  //  60sec * 60 mins
    protected $token     = null;
    protected $secretKey = '02443f12-e1ef-11e5-b86d-9a79f06e9478';

    protected function setJwt($user)
    {

        if ($this->useJwt) {
            $now         = time();
            $this->token = (new Builder())
                ->setIssuer($_SERVER['REMOTE_ADDR']) // Configures the issuer (iss claim)
                ->setAudience($_SERVER['REMOTE_ADDR']) // Configures the audience (aud claim)
                ->setId($this->secretKey, true) // Configures the id (jti claim), replicating as a header item
                ->setIssuedAt($now) // Configures the time that the token was issue (iat claim)
                ->setNotBefore($now + 0) // Configures the time that the token can be used (nbf claim)
                ->setExpiration($now + $this->exptime) // 3600 Configures the expiration time of the token (exp claim)
                ->set('uid', 1) // Configures a new claim, called "uid"
                // change if custom
                ->set('username', $user) // Configures a new claim, called "uid"
                ->sign($this->signer, $this->privateKey) // creates a signature using your private key
                ->getToken(); // Retrieves the generated token

            $this->token->getHeaders(); // Retrieves the token headers
            $this->token->getClaims(); // Retrieves the token claims
            setcookie('authorised', $this->token, $now + $this->exptime);
        }
    }

    protected function getJwt($token)
    {
        if ($this->useJwt) {
            $this->token = (new Parser())->parse($token); // Parses from a string
            $this->token->getHeaders(); // Retrieves the token header
            $this->token->getClaims(); // Retrieves the token claims
            return $this->token;
        } else {
            return null;
        }
    }

    protected function getJwtInfo()
    {
        if ($this->useJwt) {
            //       echo $this->token->getHeader('jti'),PHP_EOL; // will print "4f1g23a12aa"
            // echo $this->token->getClaim('iss'),PHP_EOL; // will print "http://example.com"
            // echo $this->token->getClaim('uid'),PHP_EOL; // will print "1"
            // echo json_encode($this->token->getClaim('username')); // will print "1"
            // echo $this->token->getClaim('aud'); // will print "1"
            // echo $this->token->getClaim('iat'); // will print "1"
            // echo $this->token->getClaim('nbf'); // will print "1"
            // echo $this->token->getClaim('exp'); // will print "1"
            dump($this->token->getClaims());
            dump($this->token->getHeaders());
        }
    }

    protected function tokenverify()
    {
        if ($this->useJwt) {
            $this->token->verify($this->signer, $this->publicKey);
        } else {
            return false;
        }
    }

    protected function jwtchk()
    {
        if ($this->useJwt) {
            $data = new ValidationData(); // It will use the current time to validate (iat, nbf and exp)
            $data->setIssuer($_SERVER['REMOTE_ADDR']);
            $data->setAudience($_SERVER['REMOTE_ADDR']);
            $data->setId($this->secretKey);
            if ($this->token) {
                return $this->token->validate($data); // true, because validation information is equals to data contained on the token
            } else {
                if (isset($_COOKIE['authorised'])) {
                    $token       = $_COOKIE['authorised'];
                    $this->token = (new Parser())->parse($token); // Parses from a string
                    $this->token->getHeaders(); // Retrieves the token header
                    $this->token->getClaims(); // Retrieves the token claims
                    return $this->token->validate($data); // true, because validation information is equals to data contained on the token
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    protected function updateJwtcookie()
    {
        if (isset($_COOKIE['authorised']) && $this->useJwt) {
        	$this->setJwt($this->token->getClaim('username'));  //change if custome
        }
    }
}
