<?php


class APIkey
{
	 
    protected $keys = Null;

    public function __construct($origin, $conn) {
						
		$this->origin = $origin;
		$this->domain = $origin;
		$this->conn = $conn;
        $this->keys = $this->getKeys();
    }
	
	protected function getKeys() {
 
			$q="select * from api_key order by api_key ASC";

			$data = $this->execute($q);
			
			return $data;			
    }
	
	public function listKeys($filter=Null) {
			echo "<p>KEYS</p>";
			foreach($this->keys as $k) {
				echo "<p>Key: ".$k['api_key']." Domain: ".$k['domain']." Active: ".$k['active']."</p>";
			}
			
    }
	
	public function verifyKey($key) {
		foreach($this->keys as $k) {
			if($k['api_key'] == $key && $k['active'] ==1 && $k['domain'] == $this->domain) {
				return true;
			}
		}
		return false;
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
		
 }
 
?>