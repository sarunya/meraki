SELECT distinct data->>'category'
FROM product
WHERE (data->>'is_active'='true');