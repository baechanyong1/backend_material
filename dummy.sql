--상품 추가
INSERT INTO Product (name, price, stock, category, imageUrl, description, status)
VALUES ('새우깡', 5, 9999, 'grocery', 'none', '누구나 다 아는 새우깡', 'available');

--쿠폰 추가
INSERT INTO Coupon (type, value, category)
VALUES('percent', 30, 'grocery');

-- --신고 추가
-- INSERT INTO IssuedCoupon (user_id, valid_from, valid_until, reason, active, created_at)
-- VALUES('a505fb92-9a72-499d-a5fb-fe09f18069b2', '2024-01-01', '2024-01-02', '욕설 금지', true, now());
