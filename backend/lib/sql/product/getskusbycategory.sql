SELECT productid
FROM product
WHERE (data->>'category'=$1) and (data->>'is_active'='true');