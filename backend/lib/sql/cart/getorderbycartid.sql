SELECT data
FROM cart
WHERE (id=$1 and data->>'status'='Ordered');