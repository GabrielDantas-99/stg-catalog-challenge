-- Atualiza as categorias dos produtos para português (PostgreSQL)
UPDATE products SET category = 'eletrônicos' WHERE category = 'electronics';
UPDATE products SET category = 'roupas' WHERE category = 'clothing';
UPDATE products SET category = 'casa' WHERE category = 'home';
UPDATE products SET category = 'esportes' WHERE category = 'sports';