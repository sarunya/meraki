update product 
set data=$2, modified_date=now() 
where cartid=$1
returning data;