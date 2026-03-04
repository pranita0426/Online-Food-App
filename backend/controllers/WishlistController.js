const  WishlistService = require ("../services/WishlistService");

 const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, skuCode } = req.body;
    console.log('Wishlist add request', { userId, productId, skuCode });

    const wishlist = await WishlistService.addToWishlist(userId, productId, skuCode);
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error('Wishlist add failed', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { skuCode } = req.body; // optional

    const wishlist = await WishlistService.removeFromWishlist(userId, productId, skuCode);
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await WishlistService.getWishlist(userId);
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {addToWishlist,removeFromWishlist,getWishlist}