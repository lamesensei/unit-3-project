class MembersController < ApplicationController
  def index
  end

  def show
  end

  def new
    @member = Member.new
  end

  def create
    @member = Member.new(member_params)
    @group = Group.find(params[:group_id])
    @member.group = @group
    #@member.user = User.find(current_user.id) if current_user.present?
    @member.save
    redirect_to @group
  end

  private

  def member_params
    params.require(:member).permit(:name, :group_id)
  end
end
