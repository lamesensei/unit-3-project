class GroupsController < ApplicationController
  def index
    @member = Member.new
    # if params[:code]
    #   @group = Group.find_by(code: params[:code])
    #   redirect_to group_path(@group) if @group.present?
    # end
  end

  def show
    @group = Group.find_by(code: params[:code])
    @members = @group.members.all
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.save
    @user = User.find(current_user.id)
    @member = Member.new(name: current_user.profile.fullname)
    @member.group = @group
    @member.user = @user
    @member.save
    redirect_to @group
  end

  private

  def group_params
    params.require(:group).permit(:code, :size)
  end
end
