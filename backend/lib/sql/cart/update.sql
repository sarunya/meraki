update cart 
set data=$2, modified_date=now() 
where id=$1
returning data;