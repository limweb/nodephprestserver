<?php
require_once __DIR__.'/../libs/RestfulServer.php';
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Rsa\Sha256;

class  JwtService extends RestfulServer {
		protected $usedb = false;
		public function __construct() {
			$this->useJwt = true;
			$this->debug = true;
			parent::__construct();

			if(isset($_COOKIE['authorised'])){

			} else {
				$user = new stdClass();
				$user->name = 'tlen';
				$user->level = 5;
				$user->status = 1;
				$user->role = 'admin';
				$this->setJwt($user);
			}
		}

		public function index(){
			echo 'It work '.__DIR__;
			echo 'IndexService';
			consolelog('--------------------------- test index----------------------------------------');
			dump($this);
			if(isset($_COOKIE['authorised'])){
				$auth = $_COOKIE['authorised'];
				echo $this->getJwt($auth);
				echo $this->getJwtInfo();
				var_dump($this->jwtchk());
			}  else {
			}
		}
}

$service = new JwtService();
$service->run();
