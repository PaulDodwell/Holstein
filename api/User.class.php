<?php


class User
{
	 
    protected $users = Null;

    public function __construct($origin, $conn) {
						
		$this->origin = $origin;
		$this->conn = $conn;
        $this->users = $this->getUsers();
    }
	
	protected function getUsers() {
 
			$q="select * from user order by user ASC";

			$data = $this->execute($q);
			
			return $data;			
    }
	
	public function listUsers($filter=Null) {
 			echo "<p>USERS</p>";
			foreach($this->users as $u) {
				echo "<p>Username: ".$u['user']." Email: ".$u['email']." Name: ".$u['first_name']." ".$u['last_name']."</p>";
			}

    }
	
	public function verifyUser($user) {
		foreach($this->users as $u) {
			if($u['user'] == $user && $u['active'] ==1) {
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