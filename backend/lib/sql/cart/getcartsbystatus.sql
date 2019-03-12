SELECT data
FROM cart
WHERE (data->>'status'=$1);