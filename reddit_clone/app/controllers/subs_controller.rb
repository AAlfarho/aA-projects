class SubsController < ApplicationController
  before_action :ensure_logged_in, only: [:new, :create, :edit, :update]
  before_action :ensure_sub_owner, only: [:edit, :update]

  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator_id = current_user.id
    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def edit
    @sub = Sub.find(params[:id])
    render :edit
  end

  def update
    @sub = current_user.subs.find(params[:id])
    if @sub && @sub.update_attributes(sub_params)
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :edit
    end
  end

  def show
    @sub = Sub.find(params[:id])
    render :show
  end

  def index
    @subs = Sub.all
    render :index
  end

  def ensure_sub_owner
    @sub = current_user.subs.find(params[:id])
    if @sub
      true
    else
      flash[:errors] = ["You're not the owner of this sub"]
      redirect_to sub_url(params[:id])
    end
  end

  def sub_params
    params.require(:sub).permit(:title, :description)
  end

end
