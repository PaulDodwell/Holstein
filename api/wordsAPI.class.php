<?php

require_once 'API.class.php';
require_once 'twitterAuth.class.php';
class wordsAPI extends API
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
				//$data = array('success'=> false,'message'=>'failure message: no data!');
				$data = null;
			}
			else {
				$data = $result;
				
			}
			
			return $data;
		
	}


    /**
     * Endpoints
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
	 
	  protected function id() {
		if ($this->method == 'GET') {
			$query = $this->request['q'];
			
			$q="select id,word,part,part2,def from dictionary where id = $query";

			$data = $this->execute($q);
			
			return unstrip_array($data);			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	 protected function word() {
		if ($this->method == 'GET') {
			$query = $this->request['q'];

			$q="select id,word from dictionary WHERE word like '$query%' order by word ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	 protected function same() {
		if ($this->method == 'GET') {
			$query = $this->request['q'];

			$q="select id,word,part,part2,def from dictionary WHERE word like '$query' order by word ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	 protected function random() {
		if ($this->method == 'GET') {
			$num = $this->request['q'];

			$q="select id,word from dictionary WHERE 0.001 >= RAND() limit $num ";

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

			$q="select id,word from dictionary where word like '%$query%' and (part = 'v' or part2 = 'v') order by word ASC";

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

			$q="select id,word from dictionary where word like '%$query%' and (part = 'n' or part2 = 'n') order by word ASC";

			$data = $this->execute($q);
			
			return $data;			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
	 
	  protected function auth() {
		if($key = $this->request['key']) {
			$tw = new twitterAuth();
			return $tw->get_bearer_token($key);
		  }
	 }
	 
	 protected function twitter() {
		 if ($this->method == 'GET') {
			$query = $this->request['q'];
			if(isset($this->request['lang'])) {
				$lang = $this->request['lang'];
			} 
			else {
				$lang='en';
			}
			$tw = new twitterAuth();
			$bearer_token = 'AAAAAAAAAAAAAAAAAAAAAOvq0QAAAAAA5CR%2B%2BKkLaG%2BHzpWZVsvUT5Gvh%2Fw%3DMKEdaigeiSJIzgspOZNqZlbxhPo3cWSP4rPQX0cN8HAFsORIY8';
			$data = $tw->search_for_a_term($bearer_token, $query, $lang);
			
			return json_decode($data);			
		}
		else {
            return "Only accepts GET requests";
        }
	 }
		
 }
 
?>