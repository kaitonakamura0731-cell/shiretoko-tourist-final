// 北の逸品堂 — クライアントサイドカート (sessionStorage)
// 静的サイト上でカート表示を確認するための軽量実装。
(function () {
  const KEY = 'kn-cart-v1';
  const COUPON_KEY = 'kn-coupon-v1';
  const storage = window.sessionStorage;

  // クーポンは1注文につき1件まで適用する。
  const COUPONS = [
    { code: 'LINE500', label: 'LINE登録クーポン', amount: 500 },
  ];

  const cart = {
    coupons: COUPONS,
    get() {
      try {
        return JSON.parse(storage.getItem(KEY) || '[]');
      } catch (e) {
        return [];
      }
    },
    set(items) {
      storage.setItem(KEY, JSON.stringify(items));
      this.render();
      document.dispatchEvent(new CustomEvent('cart:change'));
    },
    add(slug, name, price, qty) {
      // 引数を正規化: bundles等から {slug,title,price,qty,type} を渡されても受ける
      if (typeof slug === 'object' && slug !== null) {
        const obj = slug;
        slug = obj.slug;
        name = obj.name || obj.title || '';
        price = obj.price;
        qty = obj.qty;
      }
      qty = parseInt(qty, 10) || 1;
      price = parseInt(price, 10) || 0;
      name = String(name || '').slice(0, 200);
      slug = String(slug || '');
      if (!slug) return;
      const items = this.get();
      const ex = items.find((i) => i.slug === slug);
      if (ex) ex.qty += qty;
      else items.push({ slug: slug, name: name, price: price, qty: qty });
      this.set(items);
      this.flash('「' + name + '」をカゴに追加しました');
    },
    remove(slug) {
      this.set(this.get().filter((i) => i.slug !== slug));
    },
    setQty(slug, qty) {
      const items = this.get();
      const ex = items.find((i) => i.slug === slug);
      if (ex) ex.qty = Math.max(1, parseInt(qty, 10) || 1);
      this.set(items);
    },
    clear() {
      this.set([]);
    },
    count() {
      return this.get().reduce((a, b) => a + b.qty, 0);
    },
    subtotal() {
      return this.get().reduce((a, b) => a + b.price * b.qty, 0);
    },
    shipping() {
      // 送料無料判定はクーポン適用前の商品小計で行う（仕様）
      const s = this.subtotal();
      if (s === 0) return 0;
      return s >= 5000 ? 0 : 800;
    },
    total() {
      // クーポン適用前の合計（小計＋送料）
      return this.subtotal() + this.shipping();
    },
    getCoupon() {
      try {
        const code = window.localStorage.getItem(COUPON_KEY);
        if (!code) return null;
        return COUPONS.find((c) => c.code === code) || null;
      } catch (e) {
        return null;
      }
    },
    applyCoupon(code) {
      code = String(code || '').trim().toUpperCase();
      const found = COUPONS.find((c) => c.code === code);
      if (!found) return null;
      try {
        window.localStorage.setItem(COUPON_KEY, found.code);
      } catch (e) {
        /* localStorage 不可環境は無視 */
      }
      this.render();
      document.dispatchEvent(new CustomEvent('cart:change'));
      return found;
    },
    clearCoupon() {
      try {
        window.localStorage.removeItem(COUPON_KEY);
      } catch (e) {
        /* noop */
      }
      this.render();
      document.dispatchEvent(new CustomEvent('cart:change'));
    },
    couponDiscount() {
      const c = this.getCoupon();
      if (!c) return 0;
      // 値引きは合計を超えない
      return Math.min(c.amount, this.total());
    },
    payable() {
      return Math.max(0, this.total() - this.couponDiscount());
    },
    render() {
      const count = this.count();
      // ヘッダーのカウンタ更新
      document.querySelectorAll('[data-cart-link]').forEach((el) => {
        el.textContent = 'カート (' + count + ')';
      });
      // カートページ専用の再描画
      if (typeof window.renderCartPage === 'function') {
        window.renderCartPage();
      }
    },
    flash(msg) {
      let t = document.getElementById('cart-flash');
      if (!t) {
        t = document.createElement('div');
        t.id = 'cart-flash';
        t.className = 'cart-flash';
        document.body.appendChild(t);
      }
      t.textContent = msg;
      t.classList.add('cart-flash--show');
      clearTimeout(t._to);
      t._to = setTimeout(() => t.classList.remove('cart-flash--show'), 2500);
    },
  };

  window.cart = cart;
  document.addEventListener('DOMContentLoaded', () => cart.render());
})();
