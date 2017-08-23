require 'byebug'
class CommentsController < ApplicationController

  def create
    comment = Comment.new(comment_params)
    if comment.save!
      render json: comment
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy!
      render json: comment
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity
    end

  end

  def index
    comments = []
    case
    when params[:author_id]
      comments = Comment.where(author_id: params[:author_id])
    when params[:artwork_id]
      comments = Comment.where(artwork_id: params[:artwork_id])
    else
      comments = Comment.all
    end
    render json: comments
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :author_id, :artwork_id)
  end
end
