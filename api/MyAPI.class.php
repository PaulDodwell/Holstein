<?php

require_once 'API.class.php';
class MyAPI extends API
{
    protected $User;

	private $dataBase = 'parasang_words';
	 
    protected $conn = Null;

    public function __construct($request, $origin) {
        parent::__construct($request);
						
		$this->conn = $this->connectDb($this->dataBase);

        // Abstracted out for example
       // $APIKey = new Models\APIKey();
        //$User = new Models\User();
		$APIkey=array('123456','000001');
		$User=array('name'=>'Paul','address'=>'17 Wingmore Road, London SE24 0AS');
		$this->APIkey = $APIkey;
        if (!array_key_exists('apiKey', $this->request)) {
            throw new Exception('No API Key provided');
		} else if(!$this->verifyKey($this->request['apiKey'])) {
			throw new Exception('Invalid API Key');
       // } else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
       //     throw new Exception('Invalid API Key');
       // } else if (array_key_exists('token', $this->request) &&
      //       !$User->get('token', $this->request['token'])) {
		//
       //     throw new Exception('Invalid User Token');
        }

        $this->User = $User;
    }
	
	private function verifyKey($key) {
		if(in_array($key,$this->APIkey)) {
			return true;
		}
		return false;
	}
	
	private function connectDb($dbName) {

		$connStr = "mysql:host=Localhost;dbname=$dbName;charset=utf8";
		$db = new PDO($connStr, 'root', '');
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
	
	private function execute($query) {
		
			try {
				  $rows=getData($this->conn,$query);
				} catch(PDOException $ex) {
				   echo "ERROR GETTING DATA: ".$ex;
			}
			
			$result=array();
			
			foreach($rows as $r) {
				$result[]=$r;
			}
			
			if(count($result)==0) {
				$data = json_encode(array('success'=> false,'message'=>'failure message: no data!'));
			}
			else {
				$data = $result;
				
			}
			
			return $data;
		
	}


    /**
     * Example of an Endpoint
     */
     protected function name() {
        if ($this->method == 'GET') {
           //return "Your name is " . $this->User->name;
		   return "Your name is " . $this->User['name'];
		   
        } else {
            return "Only accepts GET requests";
        }
     }
	 
	  protected function address() {
        if ($this->method == 'GET') {
           //return "Your name is " . $this->User->name;
		   return "Your address is " . $this->User['address'];
		   
        } else {
            return "Only accepts GET requests";
        }
     }
	 
	 protected function like() {
		if ($this->method == 'GET') {
			$query = $this->request['q'];
			echo "<h1>$query</h1>";
			$q="select word,def from dictionary where word like '%$query%' order by word ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	 protected function verb() {
		if ($this->method == 'GET') {
			$query = $this->request['q'];
			echo "<h1>$query</h1>";
			$q="select word,def from dictionary where word like '%$query%' and (part = 'v' or part2 = 'v') order by word ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	 protected function noun() {
		if ($this->method == 'GET') {
			$query = $this->request['q'];
			echo "<h1>$query</h1>";
			$q="select word,def from dictionary where word like '%$query%' and (part = 'n' or part2 = 'n') order by word ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
		
 }
 
?>