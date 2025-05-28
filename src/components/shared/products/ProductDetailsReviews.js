"use client";
import { useState, useEffect } from 'react';
import modifyNumber from "@/libs/modifyNumber";
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from '@/providers/UserContext';
import { useTranslations } from '@/hooks/useTranslate';
import useSweetAlert from '@/hooks/useSweetAlert';
import axiosInstance from '../../../libs/axiosInstance.js';

const ProductDetailsReviews = ({ reviews, reviewsLength, productId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('common');
  const { userData, login } = useUserContext();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const creteAlert = useSweetAlert()
  const handleRatingClick = (selectedRating) => {
    if (!userData) return;
    setRating(selectedRating);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(loginData.email, loginData.password);
      if (!result) throw new Error(t("Invalid email or password"));
    } catch (err) {
      setError(err.message || t('somethingWentWrong'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) return;

    setError("");
    setSuccess("");

    if (!rating) {
      setError(t('selectRating'));
      return;
    }

    if (!reviewText.trim()) {
      setError(t('enterReview'));
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/review', 
       {
        product: productId,
        rating,
        comment: reviewText,
      },{
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }}
      );

      const data = await response.json();
console.log(data)
      if (!response.ok) {creteAlert("error", t(data.message)) 
        return;}
      else {creteAlert("success", t(data.response.data.message))}
      
      setSuccess(t('reviewSubmitted'));
      setRating(0);
      setReviewText("");
    } catch (err) {
      console.log("err", err);
      setError(t(err.response.data.message) || t('somethingWentWrong'));
    } finally {
      setIsSubmitting(false);
    }
  };



  const renderStars = (currentRating, interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <li key={star}>
        <Link 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (interactive) {
              handleRatingClick(star);
            }
          }}
        >
          <i className={star <= currentRating ? "fas fa-star" : "far fa-star"}></i>
        </Link>
      </li>
    ));
  };
  return (
    <div className="ltn__shop-details-tab-content-inner">
      {reviewsLength > 0 && <>
      <h4 className="title-2">{t('customerReviews')}</h4>
      <div className="product-ratting">
        <ul onClick={(e) => e.preventDefault()}>
          {renderStars(
            reviewsLength > 0 
              ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
              : 0
          )}
          <li className="review-total">
            <Link href="#"> ({modifyNumber(reviewsLength)} {t('reviews')})</Link>
          </li>
        </ul>
      </div>
      <hr />
      </>}
      
      {/* Reviews List */}
      <div className="ltn__comment-area mb-30">
        <div className="ltn__comment-inner">
          <ul>
            {reviewsLength > 0 ? (
              reviews?.map(({ user, comment, createdAt, rating: reviewRating }, idx) => (
                <li key={idx}>
                  <div className="ltn__comment-item clearfix">
                    <div className="ltn__commenter-comment">
                      <h6>
                        {user.name}
                      </h6>
                      <div className="product-ratting">
                        <ul>
                          {renderStars(reviewRating)}
                        </ul>
                      </div>
                      <p>{comment}</p>
                      <span className="ltn__comment-reply-btn">
                        {new Date(createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>{t('noReviews')}</p>
            )}
          </ul>
        </div>
      </div>
      
      {/* Review Form Section */}
      <div className="ltn__comment-reply-area ltn__form-box mb-30">
        {!userData ? (
          <div className="mb-30">
            <h5>
              {t('please')} <Link href="/login">{t('login')}</Link> {t('toSubmitReview')}
            </h5>
            <form onSubmit={handleLogin}>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-item input-item-name ltn__custom-icon">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('enterEmail')}
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-item-email ltn__custom-icon">
                    <input
                      type="password"
                      name="password"
                      placeholder={t('password')}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </div>
              </div>
              {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
              <button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">
                {t('signIn')}
              </button>
              <div className="row mt-10">
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                  <p className="mb-0">
                    {t('noAccount')} <Link href="/register" className="secondary-link">{t('registerHere')}</Link>
                  </p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="mb-0 text-md-end">
                    <Link href="/forgot-password" className="secondary-link">{t('forgotPassword')}</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h4 className="title-2">{t('addReview')}</h4>
            
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <div className="mb-30">
              <div className="add-a-review">
                <h6>{t('yourRating')}:</h6>
                <div className="product-ratting">
                  <ul>
                    {renderStars(rating, true)}
                  </ul>
                  {rating > 0 && <span className="ms-2">{rating} {t(rating !== 1 ? 'stars' : 'star')}</span>}
                </div>
              </div>
            </div>
            
            <div className="input-item input-item-textarea ltn__custom-icon">
              <textarea 
                placeholder={t('typeYourReview')}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>
            
            <div className="btn-wrapper">
              <button
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsReviews;