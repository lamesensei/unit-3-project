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
    @profile = Profile.find(params[:id])
  end

  def update
    @profile = Profile.find(params[:id])
    @profile.update(profile_params)

    redirect_to @profile
  end

  private

  def profile_params
    params.require(:profile).permit(:username, :fullname, :age, :user_id)
  end
end
