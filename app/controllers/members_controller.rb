class MembersController < ApplicationController
  def index
  end

  def show
  end

  def new
    @member = Member.new
  end

  def create
    @member = Member.new(name: params[:member][:name])
    @group = Group.find_by(code: params[:member][:code])
    @member.group = @group
    #@member.user = User.find(current_user.id) if current_user.present?
    @member.save
    redirect_to @group
  end

  def update
    # redirect_to root_path
  end

  private

  def member_params
    params.require(:member).permit(:name, :code)
  end
end
