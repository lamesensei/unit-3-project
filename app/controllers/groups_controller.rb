class GroupsController < ApplicationController
  before_action :authenticate_user!, :except => [:show, :crossroads, :landing]

  def index
    @user = User.find(current_user.id)
    @groups = @user.groups
  end

  def show
    @group = Group.find_by(code: params[:code])
    @members = @group.members.all
    if user_signed_in?
      @member = Member.find_by user_id: current_user.id
    elsif cookies[:current_member]
      @member = Member.find(cookies[:current_member])
    end
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    @group.save
    @user = User.find(current_user.id)
    @member = Member.new(name: current_user.profile.username)
    @member.group = @group
    @member.user = @user
    @member.save
    redirect_to @group
  end

  def landing
  end

  def crossroads
    @group = Group.find_by(code: params[:code])
    return redirect_to root_path(:error => true) if @group == nil
    if user_signed_in?
      if @group.owner == User.find(current_user.id)
        return redirect_to @group
      elsif User.find(current_user.id).groups.include? @group
        return redirect_to @group
      elsif @group.is_not_full?
        @user = User.find(current_user.id)
        @member = Member.new(name: current_user.profile.username)
        @member.group = @group
        @member.user = @user
        @member.save
        redirect_to @group
      end
    elsif cookies[:current_member]
      member_id = cookies[:current_member]
      if Member.find(member_id).group == @group
        return redirect_to @group
      end
    else
      @member = Member.new
    end
  end

  private

  def group_params
    params.require(:group).permit(:code, :size)
  end
end
