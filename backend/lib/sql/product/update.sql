update product 
set data=$2, modified_date=now() 
where productid=$1;