class CommentsController < ApplicationController
  def new
    @comment = Comment.new
    @post = Post.find(params[:post_id])
    @comment.commentable = @post
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id

    if params[:post_id]
      @comment.commentable = Post.find(params[:post_id])
    else
      @comment.commentable = Comment.find(params[:parent_comment_id])
    end

    if @comment.save
      redirect_to post_url(@comment.find_post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      if @comment.commentable_type == 'Post'
        render :new
      else
        ##render back to parent comment
      end
    end
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
