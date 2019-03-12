SELECT data
FROM product
WHERE (id = $1) and (data->>'is_active'='true');