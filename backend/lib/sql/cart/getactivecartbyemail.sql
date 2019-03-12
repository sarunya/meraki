SELECT data
FROM cart
WHERE (data->'user'->>'email'=$1) and (data->>'is_active'='true');