// generateOrderId.js

// uuid 모듈을 가져옵니다.
const { v4: uuidv4 } = require('uuid');

// 고유한 주문 ID 생성 함수
function generateOrderId() {
  // UUID를 사용하여 고유한 주문 ID를 생성하고 반환합니다.
  return uuidv4();
}

// 모듈로 export
module.exports = generateOrderId;
