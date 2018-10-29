class ProfilesController < ApplicationController
  def index
  end

  def show
    @profile = Profile.find(params[:id])
  end

  def new
    @profile = Profile.new
  end

  def create
    @profile = Profile.new(profile_params)
    @profile.user = User.find(params[:user_id])
    @profile.save
    redirect_to @profile
  end

  def edit
  end

  def update
  end

  private

  def profile_params
    params.require(:profile).permit(:username, :fullname, :age, :user_id)
  end
end
