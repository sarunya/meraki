SELECT data
FROM cart
WHERE (data->'user'->>'email'=$1) and (data->>'is_active'='false') and (data->>'order_id' IS NOT NULL);