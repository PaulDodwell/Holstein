<?php

require_once 'API.class.php';
require_once 'JWT.class.php';
class pointersAPI extends API
{
    protected $User;

	private $params = Null;
	 
    public $conn = Null;
	
	private $origin = Null;

    public function __construct($request, $origin, $args) {
        parent::__construct($request);
						
		$this->dbParams = $args;
		$this->conn = $this->connectDb();

        // Abstracted out for example
       // $APIKey = new Models\APIKey();
        //$User = new Models\User();
		$APIkey=array('123456','000001');
		$User=array('name'=>'Paul','address'=>'17 Wingmore Road, London SE24 0AS');
		$this->APIkey = $APIkey;
        //if (!array_key_exists('apiKey', $this->request)) {
        //    throw new Exception('No API Key provided');
		//} else if(!$this->verifyKey($this->request['apiKey'])) {
		//	throw new Exception('Invalid API Key');
       // } else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
       //     throw new Exception('Invalid API Key');
       // } else if (array_key_exists('token', $this->request) &&
      //       !$User->get('token', $this->request['token'])) {
		//
       //     throw new Exception('Invalid User Token');
        //}

        $this->User = $User;
		$this->origin = $origin;
		//$t = $this->sayOrigin($origin);
		header("Access-Control-Allow-Origin: *");
    }
	
	public function sayOrigin($origin) {
		echo "<p>Origin: ".$origin."</p>";
		return true;
	}
	
	//PRIVATE FUNCTIONS
	
	private function verifyKey($key) {
		if(in_array($key,$this->APIkey)) {
			return true;
		}
		return false;
	}
	
	private function connectDb() {
		$dbName = $this->dbParams['dataBase'];
		$connStr = "mysql:host=Localhost;dbname=$dbName;charset=utf8";
		$db = new PDO($connStr, $this->dbParams['userName'], $this->dbParams['pw']);
		if(!$db) {
			echo "Couldn't connect to database";
		}
		else {
        	//echo "OK";
		}
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        
        return $db;
        
	}
			
	private function jwtKey() {
		$key = "03992c95699874198450870df674bfc034851ec06eb62efdefe7850233b825a7";
		return $key;
	}
	
	private function createJWT($id) {
		
		$tokenId    = base64_encode(mcrypt_create_iv(32));
		$issuedAt   = time();
		$notBefore  = $issuedAt + 0;             //Adding 10 seconds
		$expire     = $notBefore + 86400;            // Adding 24 hours
		$serverName = 'pointercontact_api'; // Retrieve the server name from config file
				
		/*
		* Create the token as an array
		*/
		$jwtData = array(
			'iat'  => $issuedAt,         // Issued at: time when the token was generated
			'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
			'iss'  => $serverName,       // Issuer
			'nbf'  => $notBefore,        // Not before
			'exp'  => $expire,           // Expire
			'data' => array(                  // Data related to the signer user
				'userId'   => $id, // userid from the users table
				'userName' => $id, // User name
			)
		);
				
		$jwt = JWT::encode($jwtData,$this->jwtKey());
		$payload = JWT::decode($jwt,$this->jwtKey());
		if($payload) {		
			return $jwt;
		}
		else {
			return "jwt_error";
		}
		
	}
	
	private function checkAuth() {
		
		$jwt = str_replace('bearer ','',json_decode($this->getBearerToken()));		
		if($payload = JWT::decode($jwt,$this->jwtKey())) {
			if($payload->exp > time()) {
				$d = $payload->data;
				return $d->userId;
			}
		}
		return false;
		
	}
	

	 private function getallheaders() {
		 
		  foreach($_SERVER as $name => $value) {
			   if(substr($name, 0, 5) == 'HTTP_') {
					$headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
			   }
		  }
		  return $headers;
	 }
	
	private function getBearerToken() {
		$headers = $this->req_headers['Authorization'];
		// HEADER: Get the access token from the header
		if (!empty($headers)) {
			if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
				return $matches[1];
			}
		}
		return 'Unauthorized Access';
	}
	
	private function getData($db,$query) {
		$stmt = $db->prepare($query);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	
	private function getSingleColVal($db,$query) {
		$stmt = $db->prepare($query);
		$stmt->execute();
		return $stmt->fetchColumn();
	}
	
	private function postData($query,$data) {
		
			try {
				   $stmt = $this->conn->prepare($query);
				   $stmt->execute($data);
				   return "OK";
				} catch(PDOException $ex) {
				   return "ERROR INPUTTING DATA: ".$ex." ".$query;
			}
		
	}
	
	private function execute($query) {
		
			try {
				  $rows=$this->getData($this->conn,$query);
				} catch(PDOException $ex) {
				   return "ERROR GETTING DATA: ".$ex;
			}
			
			$result=array();
			
			foreach($rows as $r) {
				$result[]=$r;
			}
			
			if(count($result)==0) {
				//$data = array('success'=> false,'message'=>'failure message: no data!');
				$data = null;
			}
			else {
				$data = $result;
				
			}
			
			return $data;
		
	}
	
	private function executeSingleCol($query) {
		
			try {
				  $value=$this->getSingleColVal($this->conn,$query);
				} catch(PDOException $ex) {
				   return "ERROR GETTING DATA: ".$ex;
			}
			
			return $value;
		
	}


    /**
     * Endpoints
     */
	 
	   protected function checkin() {
			if(!$jwtData = $this->getBearerToken()) {
				return "Unauthorised - no auth token";
			}
			if ($this->method == 'POST') {
				
				$x = $this->request;
				$rqid = isset($x['rqid']) ? $x['rqid'] : null;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}
				
				$id = (isset($x['id'])) ? $x['id'] : null;			
				if(!$id) {
					return "No target supplied";
				}
				
				$q = "UPDATE `device` SET `online` = :online WHERE `id` = :id"; 
			
				$response = $this->postData($q, array( ':id' => $id, ':online' => true ));
				
				return json_encode($jwtData);
			
			}
			else {
				return "Only accepts POST requests";
			}
	  }
	 
	   protected function checkout() {
			if(!$jwtData = $this->getBearerToken()) {
				return "Unauthorised - no auth token";
			}
			if ($this->method == 'POST') {
	
				$x = $this->request;
				$rqid = isset($x['rqid']) ? $x['rqid'] : null;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}
	
				$id = (isset($x['id'])) ? $x['id'] : null;			
				if(!$id) {
					return "No target supplied";
				}
				
				$q = "UPDATE `device` SET `online` = :online WHERE `id` = :id"; 
				
				$response = $this->postData($q, array( ':id' => $id, ':online' => false ));
				
				return json_encode($response);
			
			}
			else {
				return "Only accepts POST requests";
			}
	   }
	   
	   //link management
	   
	  	 protected function request_link() {
			if ($this->method == 'POST') {
	
				$x = $this->request;
				$rqid = isset($x['rqid']) ? $x['rqid'] : null;
												
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}								
												
				$id = (isset($x['id'])) ? $x['id'] : null;			
				if(!$id) {
					return "No target supplied";
				}
				
				$q = "INSERT INTO links ( dev1, dev2, status ) VALUES ( :dev1, :dev2, :status )";
				
				return $this->postData($q, array( ':dev1'=>$rqid, ':dev2'=>$id, ':status'=>1));
			
			}
			else {
				return "Only accepts POST requests";
			}
		 }
		 
		 protected function link_status() {
			if(!$jwtData = $this->getBearerToken()) {
				return "Unauthorised - no auth token";
			}
			if ($this->method == 'POST') {
	
				$x = $this->request;
				$rqid = isset($x['rqid']) ? $x['rqid'] : null;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}
	
				$link = (isset($x['linkid'])) ? $x['linkid'] : null;
				$status = (isset($x['status'])) ? $x['status'] : null;
				if(!$link || $status == null) {
					return "Insufficient data ".$link." ".$status;
				}
				
				if($status == 2) {
					$check = "select `status` FROM `links` WHERE `link_id` = '$link' limit 1";				
					$result = $this->executeSingleCol($check);
					//Previous link status must be 1 in order to confirm link and set status 2
					if(!$result == 1) {return "No request to confirm";}
				}
				
				$stamp = '';				
				switch($status) {					
					case 0:
						$stamp = ', `ended` = :time';
						break;
					case 1:
						$stamp = ', `ended` = null, confirmed = null';
						break;
					case 2:
						$stamp = ', `confirmed` = :time, ended = null';
						break;
					case 3:
						$stamp = ', `ended` = :time';
						break;
					default:
						//				
				}
								
				
				$q = "UPDATE `links` SET `status` = :status $stamp WHERE `link_id` = :link"; 
				$t = time();
				$response = $this->postData($q, array( ':link' => $link, ':status' => $status, ':time' => $t));
				
				return json_encode($response);
			
			}
			else {
				return "Only accepts POST requests";
			}
	    }
		 
		protected function remove_link() {
			if ($this->method == 'POST') {
	
				$x = $this->request;
				$rqid = isset($x['rqid']) ? $x['rqid'] : null;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}
				
				$linkid = (isset($x['linkid'])) ? $x['linkid'] : null;			
				if(!$linkid) {
					return "No target supplied";
				}
				
				$q = "delete from `links` WHERE `link_id` = :linkid"; 
				
				return $this->postData($q, array( ':linkid' => $linkid ));
			
			}
			else {
				return "Only accepts POST requests";
			}
		}
		
		 protected function get_links() {
			if ($this->method == 'GET') {
				$rqid = (isset($this->request['rqid'])) ? $this->request['rqid'] : null;
				$status = (isset($this->request['status'])) ? $this->request['status'] : null;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized ";
				}
				
				$qs = '';
				if($status) {
					$qs .= " AND `status` = ".$status;
				}
													
				//$q="select * FROM `links` WHERE (`dev1` = '$rqid' OR `dev2` = '$rqid') AND (`status` = 1 OR `status` = 2) order by dev2 ASC";
				$q="select * FROM `links` WHERE (`dev1` = '$rqid' OR `dev2` = '$rqid') order by dev2 ASC";
	
				$data = $this->execute($q);
				
				return $data;			
			}
			else {
				return "Only accepts GET requests";
			}
		}
		
				
		//location data transfer
		
		protected function ploc() {
			if ($this->method == 'POST') {
	
				$x = $this->request;
				$rqid = isset($x['rqid']) ? $x['rqid'] : null;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}								
												
				$id = $x['id'];
				$lat = $x['lat'];
				$lon = $x['lon'];
				$dir = isset($x['dir']) ? $x['dir'] : null;
				
				$q = "INSERT INTO loc ( id, lat, lon, dir ) VALUES ( :id, :lat, :lon, :dir )";
				
				return $this->postData($q, array( ':id'=>$id, ':lat'=>$lat, ':lon'=>$lon, ':dir'=>$dir ));
			
			}
			else {
				return "Only accepts POST requests";
			}
		}
	 
	 	 
		protected function gloc() {
			if ($this->method == 'GET') {
				$rqid = (isset($this->request['rqid'])) ? $this->request['rqid'] : false;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}
				
				$query = $this->request['q'];
				$lim = 'limit 1';
				//$rows = isset($this->request['rows']) ? $this->request['rows'] : 1;
				if(isset($this->request['rows'])) {
					$rows = $this->request['rows'];
					switch ($rows) {
						case 'all':
							$lim = '';
							break;
						default:
							$lim = 'limit '.$rows;					
					}
				}
				$q="select * from loc WHERE id = '$query' order by stamp DESC $lim";
	
				$data = $this->execute($q);
				
				return $data;			
			}
			else {
				return "Only accepts GET requests";
			}
	 }
	 
	 protected function glocs() {
			if ($this->method == 'POST') {
				$rqid = (isset($this->request['rqid'])) ? $this->request['rqid'] : false;
				
				if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
					return "Unauthorized";
				}
				
				$links = $this->request['links'];				
				$data = array();
				
				for($i = 0;$i < count($links); $i++) {					
					$id = $links[$i]					
					$q="select * from loc WHERE id = '$id' order by stamp DESC limit 1";	
					$data[] = $this->execute($q);									
				}
				
				return $data;			
			}
			else {
				return "Only accepts POST requests";
			}
	 }
	 
	 
	 //Devices
	 
	  protected function add_device() {
		if ($this->method == 'POST') {

			$x = $this->request;
			$rqid = isset($x['rqid']) ? $x['rqid'] : null;
											
			if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
				return "Unauthorized";
			}								
											
			$id = (isset($x['id'])) ? $x['id'] : null;			
			if(!$id) {
				return "No target supplied";
			}
			$avatar = isset($x['avatar']) ? $x['avatar'] : 'default.jpg';
			
			$q = "INSERT INTO device ( id, online, avatar ) VALUES ( :id, :online, :jti, :avatar )";
			
			return $this->postData($q, array( ':id'=>$id, ':online'=>true, ':jti'=>null, ':avatar'=>$avatar));
		
		}
		else {
            return "Only accepts POST requests";
        }
	 }
	 
	 protected function remove_device() {
		if ($this->method == 'POST') {

			$x = $this->request;
			$rqid = isset($x['rqid']) ? $x['rqid'] : null;
			
			if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
				return "Unauthorized";
			}
			
			$id = $x['id'];
			
			$q = "delete from `device` WHERE `id` = :id"; 
			
			return $this->postData($q, array( ':id' => $id ));
		
		}
		else {
            return "Only accepts POST requests";
        }
	  }
	 
	 protected function devices_simple() {
		if ($this->method == 'GET') {
			$rqid = (isset($this->request['rqid'])) ? $this->request['rqid'] : null;	
			
			$query = '';
			if(isset($this->request['online'])) {
				$query = $this->request['online'] ? ' where online = true' : ' where online = false';	
			}
			
			$q="select id FROM `device` $query order by id ASC";
			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 } 
	 
	 protected function devices() {
		if ($this->method == 'GET') {
			$rqid = (isset($this->request['rqid'])) ? $this->request['rqid'] : null;	
			
			if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
				return "Unauthorized ";
			}
			
			$query = '';
			if(isset($this->request['online'])) {
				$query = $this->request['online'] ? ' where online = true' : ' where online = false';	
			}
												
			$q="select *,( SELECT COUNT(*) FROM `loc` WHERE `id` = `device`.`id` ) AS `loc_count` from device $query order by id ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	 protected function device() {
		if ($this->method == 'GET') {
			$rqid = (isset($this->request['rqid'])) ? $this->request['rqid'] : null;
			
			if(empty($_SERVER['HTTPS']) || !$rqid || !$rqid == $this->checkAuth()) {
				return "Unauthorized";
			}
			
			$id = (isset($this->request['id'])) ? $this->request['id'] : null;	
			
			if(!$id) {
				return "No data supplied";
			}
			
			$q="select *,( SELECT COUNT(*) FROM `loc` WHERE `id` = `device`.`id` AND `device`.`id` = '$id') AS `loc_count` from 'device' limit 1";


			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }

	 
	 //Authentication 
	 
	 protected function check_token() {
		if ($this->method == 'POST') {

			$x = $this->request;
			$rqid = isset($x['rqid']) ? $x['rqid'] : null;
			
			if(empty($_SERVER['HTTPS']) || !$rqid) {
				return "Unauthorized";
			}
			
			$jwt = json_decode($this->getBearerToken());
			
			$q = "select * from `device` WHERE `id` = '$rqid'"; 
			
			$r = $this->execute($q);
			// Check ID and generate JWT
			if(!count($r)==1) {
				$data = 'invalid device ID -> '.$r;
			}
			else {	
				$data = 'invalid JWT';
				if(count(explode('.', $jwt)) == 3) {
					if($payload = JWT::decode($jwt,$this->jwtKey())) {
						if($payload->exp > time()) {
							$d=$payload->data;
							if($d->userId == $rqid && $r[0]['jti'] == $payload->jti) {
								$data = 'VALID';
							}
						}
						else {
							$data.=' (expired)';
						}
					}
					else {
						$data.=' JWT read error';
					}
				}
				else {
					//$data .= 'details='.$d->userId.' '.$rqid.' '.$r[0]['jti'].' '.$payload.jti;
					$data.=' Invalid format';
				}
			}
			
			return json_encode($data);		
		}
		else {
            return "Only accepts POST requests";
        }
	 }
	 
	 protected function refresh_token() {
		if ($this->method == 'POST') {

			$x = $this->request;
			$rqid = isset($x['rqid']) ? $x['rqid'] : null;
			$id = $x['id'];
			
			if(empty($_SERVER['HTTPS']) || !$rqid) {
				return "Unauthorized";
			}
			
			$q = "select * from `device` WHERE `id` = '$id'"; 
			
			$r = $this->execute($q);
			// Check ID and generate JWT
			if(!count($r)==1) {
				$data = 'invalid request -> '.$id.' '.count($r);
			}
			else {								
				$data = $this->createJWT($id);
				$payload = JWT::decode($data,$this->jwtKey());
				$jti = $payload->jti;
				$q = "UPDATE `device` SET `jti` = :jti WHERE `id` = :id"; 			
				$this->postData($q, array( ':id' => $id, ':jti' => $jti));
			}
			
			return json_encode($data);		
		}
		else {
            return "Only accepts POST requests";
        }
	 }
	 
	  protected function cancel_token() {
		if ($this->method == 'POST') {
			$x = $this->request;
			$rqid = isset($x['rqid']) ? $x['rqid'] : null;
			
			if(empty($_SERVER['HTTPS']) || !$rqid) {
				return "Unauthorized";
			}	
			
			$jwt = json_decode($this->getBearerToken());			
			$q = "select * from `device` WHERE `id` = '$rqid'"; 			
			$r = $this->execute($q);
			// Check ID and generate JWT
			if(!count($r)==1) {
				$data = 'invalid device ID -> '.$r;
			}
			else {	
				$data = 'invalid JWT';
					if(count(explode('.', $jwt)) == 3) {
							if($payload = JWT::decode($jwt,$this->jwtKey())) {		
								$d=$payload->data;
									if($d->userId == $rqid && $r[0]['jti'] == $payload->jti) {
												$q = "UPDATE `device` SET `jti` = :jti WHERE `id` = :id"; 			
												if($res = $this->postData($q, array( ':id' => $rqid, ':jti' => null))) {
													$data = "JWT CANCELLED";
												}
												else {
													$data = "Error cancelling JWT "+$res;
												}
									}
							}
							else {
								$data.=' JWT read error';
							}
					}
					else {
						$data.=' Invalid format';
					}
			}			
			return json_encode($data);		
		}
		else {
            return "Only accepts POST requests";
        }
	 }
	 
	 protected function newkey() {
		$key = bin2hex(openssl_random_pseudo_bytes(32));
		echo $key;
	 }
	 	 
	 protected function test_auth() {			
			if($rqid = isset($this->request['rqid'])) {
				if($rqid == $this->checkAuth()) {
					return true;
				}
			}
			return false;		
	 }
	 
		
 }
 
?>