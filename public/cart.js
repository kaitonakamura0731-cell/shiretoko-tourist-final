// 北の逸品堂 — クライアントサイドカート (localStorage)
// 商談デモ用モック。本番では RATIO の決済 API に置換。
(function () {
  const KEY = 'kn-cart-v1';

  const cart = {
    get() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
      } catch (e) {
        return [];
      }
    },
    set(items) {
      localStorage.setItem(KEY, JSON.stringify(items));
      this.render();
    },
    add(slug, name, price, qty) {
      qty = qty || 1;
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
      const s = this.subtotal();
      if (s === 0) return 0;
      return s >= 5000 ? 0 : 800;
    },
    total() {
      return this.subtotal() + this.shipping();
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
